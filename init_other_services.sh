#!/bin/bash
cd services
# Delete empty dirs if they exist so mvn archetype can recreate them
rm -rf leave-service recruitment-service

mvn archetype:generate -DgroupId=com.hrm.leave -DartifactId=leave-service -DarchetypeArtifactId=maven-archetype-quickstart -DarchetypeVersion=1.4 -DinteractiveMode=false
mvn archetype:generate -DgroupId=com.hrm.recruitment -DartifactId=recruitment-service -DarchetypeArtifactId=maven-archetype-quickstart -DarchetypeVersion=1.4 -DinteractiveMode=false

cd performance-service
go mod init github.com/hrm/performance
go get github.com/aws/aws-lambda-go/lambda
go get github.com/aws/aws-lambda-go/events
go get github.com/lib/pq
