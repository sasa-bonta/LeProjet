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

func DownloadImages() {

	//fanOut() {
	//Imagine you are the manager again but this time you hire a team of employees.
	//You have an individual task you want each employee to perform.
	//As each individual employee finishes their task,
	//they need to provide you with a paper report that must be placed in your BOX on your desk.

	currentDir, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}

	var downloadDirectory = strings.Replace(currentDir, "/awesomeImages", "/system-BE/public/", 1)

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
			ch <- fmt.Sprintf("%d : %s", syscall.Gettid(), message)
		}(el)
	}

	for emps > 0 {
		p := <-ch
		fmt.Println(p)
		emps--
	}
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

	//Write the bytes to the fiel
	_, err = io.Copy(file, response.Body)
	if err != nil {
		return err
	}

	return nil
}
