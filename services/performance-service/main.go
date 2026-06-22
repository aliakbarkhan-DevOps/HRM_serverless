package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	_ "github.com/lib/pq"
)

var db *sql.DB

func init() {
	var err error
	host := os.Getenv("DB_HOST")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	dbname := os.Getenv("DB_NAME")
	if host == "" {
		host = "localhost"
	}
	if user == "" {
		user = "hrm_user"
	}
	if password == "" {
		password = "hrm_password"
	}
	if dbname == "" {
		dbname = "hrm_db"
	}
	psqlInfo := fmt.Sprintf("host=%s port=5432 user=%s password=%s dbname=%s sslmode=disable",
		host, user, password, dbname)

	db, err = sql.Open("postgres", psqlInfo)
	if err != nil {
		log.Fatalf("Error opening db: %v", err)
	}
}

type PerformanceReview struct {
	EmployeeID int    `json:"employee_id"`
	ReviewerID int    `json:"reviewer_id"`
	ReviewDate string `json:"review_date"`
	Score      int    `json:"score"`
	Comments   string `json:"comments"`
}

func handler(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	headers := map[string]string{
		"Content-Type": "application/json",
	}

	if request.HTTPMethod == "POST" && strings.Contains(request.Path, "/performance") {
		var rev PerformanceReview
		err := json.Unmarshal([]byte(request.Body), &rev)
		if err != nil {
			return events.APIGatewayProxyResponse{StatusCode: 400, Body: `{"error": "Invalid request"}`, Headers: headers}, nil
		}

		sqlStatement := `INSERT INTO performance_reviews (employee_id, reviewer_id, review_date, score, comments) VALUES ($1, $2, $3, $4, $5) RETURNING id`
		var id int
		err = db.QueryRow(sqlStatement, rev.EmployeeID, rev.ReviewerID, rev.ReviewDate, rev.Score, rev.Comments).Scan(&id)
		if err != nil {
			return events.APIGatewayProxyResponse{StatusCode: 500, Body: fmt.Sprintf(`{"error": "%v"}`, err), Headers: headers}, nil
		}

		responseBody := fmt.Sprintf(`{"id": %d, "message": "Review added successfully"}`, id)
		return events.APIGatewayProxyResponse{StatusCode: 201, Body: responseBody, Headers: headers}, nil
	}

	return events.APIGatewayProxyResponse{StatusCode: 404, Body: `{"error": "Not Found"}`, Headers: headers}, nil
}

func main() {
	lambda.Start(handler)
}
