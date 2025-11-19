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

type Details struct {
	Pricing         Pricing          `json:"pricing"`
	DeliveryOptions []DeliveryOption `json:"delivery_options"`
	Includes        []string         `json:"includes"`
}

type Pricing struct {
	BaseRatePerKg int    `json:"base_rate_per_kg"`
	Currency      string `json:"currency"`
	Notes         string `json:"notes"`
}

type Transfer struct {
	ID       string `json:"id"`
	Vehicle  string `json:"vehicle"`
	Route    string `json:"route"`
	Price    string `json:"price"`
	Currency string `json:"currency"`
	Message  string `json:"message"`
}

type DeliveryOption struct {
	Type         string `json:"type"`
	Condition    string `json:"condition"`
	DeliveryTime string `json:"delivery_time"`
}

type Service struct {
	ID          int        `json:"id"`
	Name        string     `json:"name"`
	Description string     `json:"description"`
	Image       string     `json:"image"`
	Message     string     `json:"message"`
	Tours       []Tour     `json:"tours,omitempty"`
	Transfers   []Transfer `json:"transfers,omitempty"`
	Details     *Details   `json:"details,omitempty"`
}

type Message struct {
	Text string `json:"text"`
}

// 🔥 Unified function to get correct file path based on ?lang=
func getDataFilePath(r *http.Request) string {
	lang := r.URL.Query().Get("lang")

	fileMap := map[string]string{
		"en": "data/services_en.json",
		"ar": "data/services_ar.json",
		"ru": "data/services_ru.json",
		"tr": "data/services_tr.json",
	}

	if path, ok := fileMap[lang]; ok {
		return path
	}

	return fileMap["en"] // fallback
}

// 🔥 Load and unmarshal services for any handler
func loadServices(r *http.Request) ([]Service, error) {
	file := getDataFilePath(r)
	log.Println("📂 Trying to read file:", file)

	data, err := os.ReadFile(file)
	if err != nil {
		log.Println("❌ ERROR reading file:", file, err)
		return nil, err
	}

	var services []Service
	if err := json.Unmarshal(data, &services); err != nil {
		log.Println("❌ ERROR parsing JSON:", file, err)
		return nil, err
	}

	return services, nil
}

// Test endpoint
func testHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(Message{Text: "Backend connected successfully!"})
}

// 🔥 /api/services — All services
func servicesHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	file := getDataFilePath(r)
	data, err := os.ReadFile(file)
	if err != nil {
		log.Println("❌ ERROR loading services:", err)
		http.Error(w, "Failed to load services", http.StatusInternalServerError)
		return
	}

	w.Write(data)
}

// 🔥 /api/services/:id — Single service
func serviceByIDHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id := strings.TrimPrefix(r.URL.Path, "/api/services/")

	services, err := loadServices(r)
	if err != nil {
		http.Error(w, "Failed to load services", http.StatusInternalServerError)
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

// 🔥 /api/services/:id/tours — Tours of one service
func toursByServiceIDHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id := strings.TrimPrefix(r.URL.Path, "/api/services/")
	id = strings.TrimSuffix(id, "/tours")

	services, err := loadServices(r)
	if err != nil {
		http.Error(w, "Failed to load services", http.StatusInternalServerError)
		return
	}

	for _, s := range services {
		if id == fmt.Sprintf("%d", s.ID) && len(s.Tours) > 0 {
			json.NewEncoder(w).Encode(s.Tours)
			return
		}
	}

	http.Error(w, "Tours not found", http.StatusNotFound)
}

// CORS
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

// MAIN
func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("/api/test", testHandler)

	mux.HandleFunc("/api/services/", func(w http.ResponseWriter, r *http.Request) {
		if strings.HasSuffix(r.URL.Path, "/tours") {
			toursByServiceIDHandler(w, r)
		} else {
			serviceByIDHandler(w, r)
		}
	})

	mux.HandleFunc("/api/services", servicesHandler)

	handler := enableCORS(mux)

	// 🔥 Get port from Railway environment
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // local fallback
	}

	log.Println("🚀 Server running on port:", port)

	// 🔥 Bind to 0.0.0.0 so Railway can expose it
	log.Fatal(http.ListenAndServe("0.0.0.0:"+port, handler))
}
