package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
)

type Tour struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	PDF         string `json:"pdf"`
	Image       string `json:"image"`
	Message     string `json:"message"`
}

type Transfer struct {
	ID       string `json:"id"`
	Vehicle  string `json:"vehicle"`
	Route    string `json:"route"`
	Price    string `json:"price"`
	Currency string `json:"currency"`
	Message  string `json:"message"`
}

type Service struct {
	ID          int        `json:"id"`
	Name        string     `json:"name"`
	Description string     `json:"description"`
	Image       string     `json:"image"`
	Message     string     `json:"message"`
	Tours       []Tour     `json:"tours,omitempty"`
	Transfers   []Transfer `json:"transfers,omitempty"`
}

type Message struct {
	Text string `json:"text"`
}

// --- Test Endpoint ---
func testHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(Message{Text: "Backend connected successfully!"})
}

// --- Return all services ---
func servicesHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	data, err := os.ReadFile("data/services.json")
	if err != nil {
		http.Error(w, "Failed to load services data", http.StatusInternalServerError)
		return
	}
	w.Write(data)
}

// --- Return single service by ID ---
func serviceByIDHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id := strings.TrimPrefix(r.URL.Path, "/api/services/")

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

	for _, s := range services {
		if id == fmt.Sprintf("%d", s.ID) {
			json.NewEncoder(w).Encode(s)
			return
		}
	}

	http.Error(w, "Service not found", http.StatusNotFound)
}

// --- Return only tours for a given service ---
func toursByServiceIDHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id := strings.TrimPrefix(r.URL.Path, "/api/services/")
	id = strings.TrimSuffix(id, "/tours")

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

	for _, s := range services {
		if id == fmt.Sprintf("%d", s.ID) && len(s.Tours) > 0 {
			json.NewEncoder(w).Encode(s.Tours)
			return
		}
	}

	http.Error(w, "Tours not found for this service", http.StatusNotFound)
}

// --- Enable CORS ---
func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if r.Method == http.MethodOptions {
			return
		}
		next.ServeHTTP(w, r)
	})
}

func main() {
	mux := http.NewServeMux()

	// Routes
	mux.HandleFunc("/api/test", testHandler)
	mux.HandleFunc("/api/services/", func(w http.ResponseWriter, r *http.Request) {
		if strings.HasSuffix(r.URL.Path, "/tours") {
			toursByServiceIDHandler(w, r)
		} else {
			serviceByIDHandler(w, r)
		}
	})
	mux.HandleFunc("/api/services", servicesHandler)

	// Wrap with CORS
	handler := enableCORS(mux)

	log.Println("✅ Server running at http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", handler))
}
