
.PHONY: build test test-race test-cover  test-bench  clean  test-json

build:
	go build starter/main.go

test:
	go test -v ./...

test-race:
	go test -v -race ./...

test-cover:
	go test -v -coverprofile=coverage.out ./...
	go tool cover -html=coverage.out -o coverage.html

test-bench:
	go test -v -bench=. -benchmem ./...

clean:
	go clean -testcache
	rm -f coverage.out coverage.html

test-json:
	go test -v -json ./... > test_results.json

	

