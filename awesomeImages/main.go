package main

import (
	"awesomeImages/cmd"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"log"
	"net/http"
)

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		json.NewEncoder(w).Encode("Hello World; POST: localhost:4000/images, array of links in JSON format")
	})
	router.HandleFunc("/images", cmd.ReadLinks).Methods(http.MethodPost)
	log.Println("API is running!")

	fmt.Printf("\n                    ==============Starting listening for requests===============\n\n")

	http.ListenAndServe(":4000", router)
}
