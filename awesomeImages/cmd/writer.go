package cmd

import (
	"encoding/csv"
	"os"
	"sync"
)

type CsvWriter struct {
	mutex     *sync.Mutex
	csvWriter *csv.Writer
}

func NewCsvWriter(fileName string, flag int) (*CsvWriter, error) {
	file, err := os.OpenFile(fileName, flag, 0666)
	if err != nil {
		return nil, err
	}
	w := csv.NewWriter(file)
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
