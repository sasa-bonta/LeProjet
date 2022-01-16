package cmd

import (
	"encoding/csv"
	"os"
	"sync"
	"syscall"
)

type CsvWriter struct {
	mutex     *sync.Mutex
	csvWriter *csv.Writer
}

func NewCsvWriter(fileName string) (*CsvWriter, error) {
	csvFile, err := os.OpenFile(fileName, syscall.O_APPEND|syscall.O_WRONLY|syscall.O_CREAT, 0666)
	if err != nil {
		return nil, err
	}
	w := csv.NewWriter(csvFile)
	return &CsvWriter{csvWriter: w, mutex: &sync.Mutex{}}, nil
}

func (w *CsvWriter) Write(row []string) {
	w.mutex.Lock()
	w.csvWriter.Write(row)
	w.mutex.Unlock()
}

func (w *CsvWriter) Flush() {
	w.mutex.Lock()
	w.csvWriter.Flush()
	w.mutex.Unlock()
}
