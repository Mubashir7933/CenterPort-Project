package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
)

type Message struct {
	Text string `json:"text"`
}

func testHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(Message{Text: "Backend connected successfully!"})
}

func servicesHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	data, err := os.ReadFile("data/services.json")
	if err != nil {
		http.Error(w, "Failed to load services data", http.StatusInternalServerError)
		return
	}

	w.Write(data)
}

func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		next.ServeHTTP(w, r)
	})
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/api/test", testHandler)
	mux.HandleFunc("/api/services", servicesHandler)

	handler := enableCORS(mux)

	log.Println("✅ Server running at http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", handler))
}
