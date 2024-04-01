pipeline {
    agent any
    environment {
        registryCredentials = "nexus"
        registry = "197.26.204.208:8083"
    }
    stages {
    stage('Clean Build Folder (Optional)') {
            steps {
                script {
                    sh 'rm -rf node_modules'
                    sh 'npm install --legacy-peer-deps'
                    if (!fileExists('build')) {
                        echo 'Build folder not found.'
                    } else {
                        sh 'rm -rf build'
                        sh 'ls'
                        echo 'Build folder removed.'
                    }
                }
            }
        }
        stage('Build application') {
            steps {
                script {
                    try {
                        sh 'npm run build'
                    } catch (Exception e) {
                        catchError(buildResult: 'UNSTABLE', message: "Build failed: ${e.message}")
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
