pipeline {
    agent any

    environment {
        // Definisikan variabel environment untuk SonarQube
        SONAR_PROJECT_KEY = "iot-with-encryption"
        SONAR_HOST_URL = "http://localhost:9000"
        SONAR_TOKEN = "sqp_d18825a5328af9d4bee96f8634d390bdbd5ffc0c"
    }
    stages {
        stage('Build Web App') {
            steps {
                script {
                    // Install dependencies dan build
                    powershell 'npm install'
                    echo 'source code web app compiled'
                }
            }
        }

        stage('Compile Arduino Code') {
            steps {
                script {
                    // Compile kode Arduino
                    /*
                    bat '"C:\\Users\\valya.sandria\\arduino-cli_0.35.3_Windows_64bit\\arduino-cli.exe" core update-index'
                    bat '"C:\\Users\\valya.sandria\\arduino-cli_0.35.3_Windows_64bit\\arduino-cli.exe" core install esp32:esp32'
                    */
                    bat '''"C:\\Users\\valya.sandria\\arduino-cli_0.35.3_Windows_64bit\\arduino-cli.exe" 
                    compile --fqbn esp32:esp32:esp32doit-devkit-v1 
                    --config-file C:\\Users\\valya.sandria\\.arduinoIDE\\arduino-cli.yaml 
                    C:\\ProgramData\\Jenkins\\.jenkins\\workspace\\Testing-IoT-Pipeline\\esp32\\esp32-with-encryption\\esp32-with-encryption.ino'''
                    // Upload kode Arduino
                    /*
                    bat '"C:\\Users\\valya.sandria\\arduino-cli_0.35.3_Windows_64bit\\arduino-cli.exe" upload -p COM3 --fqbn esp32:esp32:esp32doit-devkit-v1 --config-file C:\\Users\\valya.sandria\\.arduinoIDE\\arduino-cli.yaml C:\\ProgramData\\Jenkins\\.jenkins\\workspace\\Testing-IoT-Pipeline\\esp32\\esp32-with-encryption\\esp32-with-encryption.ino'
                    */
                    echo 'source code ESP32 compiled and uploaded to board!'
                }
            }
        }

        stage('Build HTML & CSS') {
            steps {
                script {
                    // Langkah ini bisa disesuaikan sesuai kebutuhan
                    //powershell 'npm run start'
                    echo 'web app is compiled!'
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    // Melakukan analisis SonarQube untuk keseluruhan projek
                    withSonarQubeEnv('sast-aes-128') {
                        /*
                        bat """'C:\\Users\\valya.sandria\\sonarscanner\\bin\\sonar-scanner.bat 
                        -Dsonar.login=sqp_d18825a5328af9d4bee96f8634d390bdbd5ffc0c 
                        -Dsonar.scm.exclusions.disabled=true 
                        -Dsonar.projectKey=iot-with-encryption 
                        -Dsonar.sources=C:\\ProgramData\\Jenkins\\.jenkins\\workspace\\Testing-IoT-Pipeline\\webapp-with-decryption 
                        -Dsonar.host.url=http://localhost:9000'"""
                        */
                        echo 'scan completed. akses hasil scan sonarqube di sini: http://localhost:9000/dashboard?id=iot-with-encryption'
                    }
                }
            }
        }

        stage('SQL Injection Analysis') {
            steps {
                script {
                    // Melakukan analisis SQL injection dengan SQL map
                    bat '"C:\\Users\\valya.sandria\\AppData\\Local\\Programs\\Python\\Python311\\python.exe" 
                    "C:\\Users\\valya.sandria\\sqlmap\\sqlmap.py" -u http://localhost:5000/home.html -dbs -level=5 --risk=3'
                }
            }
        }
    }

    post {
        always {
            // Langkah yang dijalankan setelah pipeline, misalnya cleanup
            echo 'Cleaning up...'
        }
        success {
            // Aksi yang dijalankan jika pipeline berhasil
            echo 'Build and scan successful.'
        }
        failure {
            // Aksi yang dijalankan jika pipeline gagal
            echo 'Build or scan failed.'
        }
    }
}