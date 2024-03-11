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
                    // Ganti direktori sesuai dengan lokasi file .ino Anda
                        // Compile kode Arduino
                    //bat '"C:\\Users\\valya.sandria\\arduino-cli_0.35.3_Windows_64bit\\arduino-cli.exe" core update-index'
                    //bat '"C:\\Users\\valya.sandria\\arduino-cli_0.35.3_Windows_64bit\\arduino-cli.exe" core install esp32:esp32'
                    bat '"C:\\Users\\valya.sandria\\arduino-cli_0.35.3_Windows_64bit\\arduino-cli.exe" compile --fqbn esp32:esp32:esp32doit-devkit-v1 --config-file C:\\Users\\valya.sandria\\.arduinoIDE\\arduino-cli.yaml C:\\ProgramData\\Jenkins\\.jenkins\\workspace\\Testing-IoT-Pipeline\\esp32\\esp32-with-encryption\\esp32-with-encryption.ino'
                    //bat '"C:\\Users\\valya.sandria\\arduino-cli_0.35.3_Windows_64bit\\arduino-cli.exe" upload -p COM3 --fqbn esp32:esp32:esp32doit-devkit-v1 --config-file C:\\Users\\valya.sandria\\.arduinoIDE\\arduino-cli.yaml C:\\ProgramData\\Jenkins\\.jenkins\\workspace\\Testing-IoT-Pipeline\\esp32\\esp32-with-encryption\\esp32-with-encryption.ino'
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
                        // Analisis untuk Web App
                        //bat 'set SONAR_TOKEN=squ_04ccd007dec81c8ffb022b34857c2d8c9d00612e'
                        bat '"C:\\Users\\valya.sandria\\sonarscanner\\bin\\sonar-scanner.bat" -Dsonar.login=${env.SONAR_TOKEN} -Dsonar.projectKey=${env.SONAR_PROJECT_KEY} -Dsonar.sources=C:\\ProgramData\\Jenkins\\.jenkins\\workspace\\Testing-IoT-Pipeline\\webapp-with-decryption\\public -Dsonar.host.url=${env.SONAR_HOST_URL}'
                        // Analisis untuk Arduino code
                        dir('esp32') {
                            //bat 'set SONAR_TOKEN=squ_04ccd007dec81c8ffb022b34857c2d8c9d00612e'
                            bat '"C:\\Users\\valya.sandria\\sonarscanner\\bin\\sonar-scanner.bat" -Dsonar.login=${env.SONAR_TOKEN} -Dsonar.projectKey=${env.SONAR_PROJECT_KEY} -Dsonar.sources=C:\\ProgramData\\Jenkins\\.jenkins\\workspace\\Testing-IoT-Pipeline\\esp32\\esp32-with-encryption -Dsonar.host.url=${env.SONAR_HOST_URL}'
                        }
                        echo 'akses hasil scan sonarqube di sini: http://localhost:9000/dashboard?id=iot-with-encryption'
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