pipeline {
    agent any
    tools {
        // Pastikan nama ini sesuai dengan konfigurasi SonarQube Scanner yang Anda buat
        sonarQube 'sast-aes-128'
    }
    environment {
        // Definisikan variabel environment untuk SonarQube
        SONAR_PROJECT_KEY = "iot-with-encryption"
        SONAR_HOST_URL = "http://192.168.31.63:9000"
        SONAR_AUTH_TOKEN = "sqa_61313a2e8c8af50056e21a7e4365be76ea529fbc"
    }
    stages {
        stage('Checkout Web App') {
            steps {
                // Mengkloning repositori aplikasi web
                git credentialsId: '7a4de20d-81ad-4f81-a150-ca106be9d7dd', url: 'https://github.com/valyasandria/webapp-with-decryption.git', branch: 'main'
            }
        }
        
        stage('Build Web App') {
            steps {
                script {
                    // Install dependencies dan build
                    sh 'npm install'
                    sh 'npm run test'
                }
            }
        }

        stage('Checkout Arduino') {
            steps {
                script {
                    // Mengkloning repositori Arduino ke direktori 'arduino'
                    dir('arduino') {
                        git credentialsId: '7a4de20d-81ad-4f81-a150-ca106be9d7dd', url: 'https://github.com/valyasandria/esp32-with-encryption.git',  branch: 'main'
                    }
                }
            }
        }
        
        stage('Compile Arduino Code') {
            steps {
                script {
                    // Ganti direktori sesuai dengan lokasi file .ino Anda
                    dir('arduino') {
                        // Compile kode Arduino
                        sh 'arduino-cli compile --fqbn esp32:esp32:esp32 trial-dht11.ino'
                    }
                }
            }
        }

        stage('Build HTML & CSS') {
            steps {
                script {
                    // Langkah ini bisa disesuaikan sesuai kebutuhan
                    echo 'Assuming HTML & CSS do not require compilation'
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    // Melakukan analisis SonarQube untuk keseluruhan projek
                    withSonarQubeEnv('sast-aes-128') {
                        // Analisis untuk Web App
                        sh "sonar-scanner -Dsonar.projectKey=${env.SONAR_PROJECT_KEY}_web -Dsonar.sources=. -Dsonar.host.url=${env.SONAR_HOST_URL} -Dsonar.login=${env.SONAR_AUTH_TOKEN}"
                        // Analisis untuk Arduino code
                        dir('arduino') {
                            sh "sonar-scanner -Dsonar.projectKey=${env.SONAR_PROJECT_KEY}_arduino -Dsonar.sources=. -Dsonar.host.url=${env.SONAR_HOST_URL} -Dsonar.login=${env.SONAR_AUTH_TOKEN}"
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