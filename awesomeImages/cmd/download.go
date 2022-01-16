package cmd

import (
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strings"
	"syscall"
)

func DownloadImages(currentDir string) {

	//fanOut() {
	//Imagine you are the manager again but this time you hire a team of employees.
	//You have an individual task you want each employee to perform.
	//As each individual employee finishes their task,
	//they need to provide you with a paper report that must be placed in your BOX on your desk.

	var downloadDirectory = strings.Replace(currentDir, "/awesomeImages", "/system-BE/public/", 1)

	w, err := NewCsvWriter(currentDir+"/logs/download-logs.csv", syscall.O_APPEND|syscall.O_WRONLY|syscall.O_CREAT)
	w2, err := NewCsvWriter(currentDir+"/logs/current-operation-logs.csv", syscall.O_RDWR|syscall.O_CREAT|syscall.O_TRUNC)
	if err != nil {
		log.Panic(err)
	}

	emps := len(LinksSlice)
	ch := make(chan string, emps)

	for _, el := range LinksSlice {
		go func(link string) {
			var message string
			fileName := strings.Replace(link, "https://", "", 1)
			fileName = strings.ReplaceAll(fileName, "/", "^_^")

			filePath := downloadDirectory + fileName

			_, err = os.OpenFile(filePath, syscall.O_RDONLY, 777)
			if !os.IsNotExist(err) {
				message = "=== Already exists: " + fileName
			} else {
				err := downloadFile(link, filePath)
				if err != nil {
					log.Fatal(err)
				}
				message = "+++ Downloaded: " + fileName
			}
			w.Write([]string{message, "\n    └── " + link})
			w2.Write([]string{message, "\n    └── " + link})
			ch <- fmt.Sprintf("%d : %s", syscall.Gettid(), message)
		}(el)
	}

	for emps > 0 {
		p := <-ch
		fmt.Println(p)
		emps--
	}
	w.Flush()
	w2.Flush()
}

func downloadFile(URL, fileName string) error {
	//Get the response bytes from the url
	response, err := http.Get(URL)
	if err != nil {
		return err
	}
	defer response.Body.Close()

	if response.StatusCode != 200 {
		return errors.New("Received non 200 response code")
	}
	//Create a empty file
	file, err := os.Create(fileName)
	if err != nil {
		return err
	}
	defer file.Close()

	//Write the bytes to the file
	_, err = io.Copy(file, response.Body)
	if err != nil {
		return err
	}

	return nil
}
