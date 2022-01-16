package cmd

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
)

func ReadLinks(w http.ResponseWriter, r *http.Request) {
	// Read to request body
	defer r.Body.Close()
	body, err := ioutil.ReadAll(r.Body)

	if err != nil {
		log.Fatalln(err)
	}

	json.Unmarshal(body, &LinksSlice)

	log.Printf("======================Received links========================\n\n")

	for _, el := range LinksSlice {
		fmt.Println(el)
	}

	fmt.Println()

	log.Printf("================Starting downloading images=================\n\n")

	currentDir, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}

	DownloadImages(currentDir)

	dat, err := ioutil.ReadFile(currentDir + "/logs/current-operation-logs.csv")
	if err != nil {
		panic(err)
	}
	var newImgs = strconv.Itoa(strings.Count(string(dat), "+++"))
	var oldImgs = strconv.Itoa(strings.Count(string(dat), "==="))

	// Send a 201 created response
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode("processed images: { new: " + newImgs + ", existing: " + oldImgs + " }")
}
