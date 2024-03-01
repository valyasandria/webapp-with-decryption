pipeline {
    agent any

    environment {
        // Definisikan variabel environment untuk SonarQube
        SONAR_PROJECT_KEY = "iot-with-encryption"
        SONAR_HOST_URL = "http://192.168.31.63:9000"
        SONAR_AUTH_TOKEN = "sqp_bd4f187216bf71db1be65ae47a7345d7d308f36d"
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
                    // Ganti direktori sesuai dengan lokasi file .ino Anda
                    dir('esp32') {
                        // Compile kode Arduino
                        bat '"C:\\Program Files\\arduino-cli_0.35.3_Windows_64bit\\arduino-cli.exe" compile --fqbn esp32:esp32:esp32doit-devkit-v1 C:\\ProgramData\\Jenkins\\.jenkins\\workspace\\Testing-IoT-Pipeline\\esp32\\esp32-with-encryption\\esp32-with-encryption.ino'
                        echo 'source code ESP32 compiled'
                    }
                }
            }
        }

        stage('Build HTML & CSS') {
            steps {
                script {
                    // Langkah ini bisa disesuaikan sesuai kebutuhan
                    powershell 'npm run start'
                    echo 'web app is up!'
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    // Melakukan analisis SonarQube untuk keseluruhan projek
                    withSonarQubeEnv('sast-aes-128') {
                        // Analisis untuk Web App
                        powershell "sonar-scanner -Dsonar.projectKey=${env.SONAR_PROJECT_KEY}_web -Dsonar.sources=. -Dsonar.host.url=${env.SONAR_HOST_URL} -Dsonar.login=${env.SONAR_AUTH_TOKEN}"
                        // Analisis untuk Arduino code
                        dir('arduino') {
                            powershell "sonar-scanner -Dsonar.projectKey=${env.SONAR_PROJECT_KEY}_arduino -Dsonar.sources=. -Dsonar.host.url=${env.SONAR_HOST_URL} -Dsonar.login=${env.SONAR_AUTH_TOKEN}"
                        }
                    }
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