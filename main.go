package main

import (
	"encoding/json"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"
)

type Tour struct {
	Title   string `json:"title"`
	Details string `json:"details"`
	Message string `json:"message"`
}

type Service struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Message     string `json:"message"`
	Tours       []Tour `json:"tours"`
}

func loadServices() ([]Service, error) {
	data, err := ioutil.ReadFile("data/services.json")
	if err != nil {
		return nil, err
	}
	var services []Service
	err = json.Unmarshal(data, &services)
	return services, err
}

func main() {
	mux := http.NewServeMux()

	// Serve static files
	fs := http.FileServer(http.Dir("static"))
	mux.Handle("/static/", http.StripPrefix("/static/", fs))

	// Main page
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		services, err := loadServices()
		if err != nil {
			http.Error(w, "Failed to load services", http.StatusInternalServerError)
			return
		}

		tmpl := template.Must(template.ParseFiles("templates/index.html"))
		tmpl.Execute(w, services)
	})

	log.Println("Server running at http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", mux))
}
