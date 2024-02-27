pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Mengkloning repositori aplikasi web
                git credentialsId: '7a4de20d-81ad-4f81-a150-ca106be9d7dd', url: 'https://github.com/valyasandria/webapp-with-decryption.git', branch: 'main'
            }
        }
        
        stage('Build Web App') {
            steps {
                script {
                    // Asumsikan kode aplikasi web sudah ada di workspace
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
                        // Ubah 'your_board_name' dengan nama board Arduino yang sesuai
                        sh 'arduino-cli compile --fqbn esp32:esp32:esp32 trail-dht11.ino'
                    }
                }
            }
        }

        stage('Build HTML & CSS') {
            steps {
                script {
                    // Langkah ini bisa disesuaikan sesuai kebutuhan, misalnya jika Anda memerlukan preprocessing
                    echo 'Assuming HTML & CSS do not require compilation'
                }
            }
        }

//===============================================================================
        stage('Code Scan') {
            steps {
                script {
                    // Scan Arduino code
                    dir('arduino') {
                        // Ganti dengan perintah untuk tool scan kode Anda, misalnya SonarQube, atau alat lain
                        sh 'echo "Scanning Arduino code..."'
                        sh 'sonar-scanner -Dsonar.projectKey=iot-with-encryption'
                    }
                    // Scan HTML code
                    dir('webapp') {
                        // Ganti dengan perintah untuk tool scan kode HTML Anda
                        sh 'echo "Scanning HTML code..."'
                        sh 'sonar-scanner -Dsonar.projectKey=iot-with-encryption'
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
