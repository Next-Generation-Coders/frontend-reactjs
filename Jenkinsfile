pipeline {
    agent any
    environment {
        registryCredentials = "nexus"
        registry = "197.26.204.208:8083"
    }
    stages {
//         stage('Install dependencies') {
//             steps {
//                 script {
//                     sh 'npm install --force'
//                 }
//             }
//         }
//         stage('Unit Test') {
//             steps {
//                 script {
//                     sh 'echo test should go here'
//                 }
//             }
//         }
//         stage('Build application') {
//             steps {
//                 script {
//                     sh 'npm run build'
//                 }
//             }
//         }
//         stage('SonarQube Analysis') {
//             steps {
//                 script {
//                     def scannerHome = tool 'scanner'
//                     withSonarQubeEnv {
//                         sh "${scannerHome}/bin/sonar-scanner"
//                     }
//                 }
//             }
//         }
        stage('Building image') {
            steps {
                script {
                    sh 'docker-compose build'
                }
            }
        }
        stage('Deploy to Nexus') {
            steps {
                script {
                    docker.withRegistry("http://" + registry, registryCredentials) {
                        sh 'docker push $registry/frontend-pipeline_gestion_utilisateur-node_app:latest'
                    }
                }
            }
        }
        stage('Pull and Run application') {
            steps {
                script {
                    docker.withRegistry("http://" + registry, registryCredentials) {
                        sh 'docker pull $registry/frontend-pipeline_gestion_utilisateur-node_app:latest'
                        sh 'docker-compose up -d'
                    }
                }
            }
        }
        stage('Start Prometheus') {
            steps {
                script {
                    sh 'docker start prometheus'
                }
            }
        }
        stage('Start Grafana') {
            steps {
                script {
                    sh 'docker start grafana'
                }
            }
        }
    }
}
