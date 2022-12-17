pipeline {
  agent {
    node {
      label 'ololo'
    }

  }
  stages {
    stage('update') {
      steps {
        sh '''cd /opt/ololo 
./updateFront.sh'''
      }
    }

  }
}