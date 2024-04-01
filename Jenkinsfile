pipeline {
    agent any
    environment {
        registryCredentials = "nexus"
        registry = "197.26.204.208:8083"
    }
    stages {
        stage('Install dependencies') {
            steps {
                script {
                    sh 'npm install --legacy-peer-deps'
                }
            }
        }
        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'scanner'
                    withSonarQubeEnv {
                        sh "${scannerHome}/bin/sonar-scanner -X"
                    }
                }
            }
        }
        stage('Build application') {
            steps {
                script {
                    try{
                        sh 'npm run build'
                    }catch(e){
                        echo "Error during build: ${e.getMessage()}"
                        echo "Stack trace: "
                        echo e.stackTrace()
                        error "Build failed!"
                    }
                }
            }
        }
        stage('Building image') {
            steps {
                script {
                    sh('docker-compose build')
                }
            }
        }
        stage('Deploy to Nexus') {
            steps {
                script {
                    docker.withRegistry("http://"+registry, registryCredentials) {
                        sh('docker push $registry/frontend-pipeline_gestion_utilisateur-node_app:latest')
                    }
                }
            }
        }
        stage('Run application') {
            steps {
                script {
                    docker.withRegistry("http://" + registry, registryCredentials) {
                        sh('docker pull $registry/frontend-pipeline_gestion_utilisateur-node_app:latest')
                        sh('docker-compose up -d')
                    }
                }
            }
        }
        stage('Run Prometheus') {
            steps {
                script {
                    sh('docker start prometheus')
                }
            }
        }
        stage('Run Grafana') {
            steps {
                script {
                    sh('docker start grafana')
                }
            }
        }

    }
}
