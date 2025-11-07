package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
)

type Service struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Image       string `json:"image"`
	Message     string `json:"message"`
}

type Message struct {
	Text string `json:"text"`
}

func testHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(Message{Text: "Backend connected successfully!"})
}

// Return all services
func servicesHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	data, err := os.ReadFile("data/services.json")
	if err != nil {
		http.Error(w, "Failed to load services data", http.StatusInternalServerError)
		return
	}
	w.Write(data)
}

// Return single service by ID
func serviceByIDHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Extract the ID from URL, e.g. /api/services/2
	id := strings.TrimPrefix(r.URL.Path, "/api/services/")

	// Read JSON file
	data, err := os.ReadFile("data/services.json")
	if err != nil {
		http.Error(w, "Failed to load services data", http.StatusInternalServerError)
		return
	}

	var services []Service
	if err := json.Unmarshal(data, &services); err != nil {
		http.Error(w, "Failed to parse services data", http.StatusInternalServerError)
		return
	}

	// Find service by ID
	for _, s := range services {
		if id == fmt.Sprintf("%d", s.ID) {
			json.NewEncoder(w).Encode(s)
			return
		}
	}

	http.Error(w, "Service not found", http.StatusNotFound)
}

// Enable CORS
func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		next.ServeHTTP(w, r)
	})
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/api/test", testHandler)
	mux.HandleFunc("/api/services/", serviceByIDHandler) // must come before /api/services
	mux.HandleFunc("/api/services", servicesHandler)

	handler := enableCORS(mux)

	log.Println("✅ Server running at http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", handler))
}
