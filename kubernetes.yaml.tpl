# Copyright 2018 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

apiVersion: apps/v1
kind: Deployment
metadata:
  name: greenhouse-api
  labels:
    app: greenhouse-api
spec:
  replicas: 1
  selector:
    matchLabels:
      app: greenhouse-api
  template:
    metadata:
      labels:
        app: greenhouse-api
    spec:
      containers:
      - name: greenhouse-api
        image: gcr.io/GOOGLE_CLOUD_PROJECT/greenhouse-api:COMMIT_SHA
        ports:
        - containerPort: 10666
---
kind: Service
apiVersion: v1
metadata:
  name: greenhouse-api
spec:
  selector:
    app: greenhouse-api
  ports:
  - protocol: TCP
    port: 10666
    targetPort: 10666
  type: LoadBalancer
