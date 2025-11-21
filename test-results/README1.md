# Deployment Guide for People and Onion Applications on Linux Server

This guide provides step-by-step instructions to deploy the People and Onion applications using Docker, Supervisor, Apache, and AWS services on a Linux server.

## Prerequisites

1. **Linux Server**: Ensure you have access to a Linux server.
2. **Installed Software**:
   - Docker and Docker Compose
   - Supervisor
   - Apache HTTP Server
   - Node.js (if needed for specific scripts)
3. **Applications**: Ensure the People and Onion applications are available in a Git repository or local files.
4. **AWS Account**: Access to an AWS account with permissions to manage Route 53 and S3.

---

## Step 1: Install Required Software

### Install Docker

```bash
sudo apt update
sudo apt install -y docker.io
sudo systemctl start docker
sudo systemctl enable docker
```

### Install Docker Compose

```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### Install Supervisor

```bash
sudo apt install -y supervisor
```

### Install Apache

```bash
sudo apt install -y apache2
sudo systemctl start apache2
sudo systemctl enable apache2
```

---

## Step 2: Prepare Applications

### Clone the Applications

```bash
git clone https://your-repo-url/people.git /home/ubuntu/people
git clone https://your-repo-url/onion.git /home/ubuntu/onion
```

### Create Docker Compose Files

#### For People Application (`/home/ubuntu/people/docker-compose.yml`):

```yaml
version: '3.8'
services:
  people-app:
    build: .
    container_name: people_app
    ports:
      - "4000:4000"
    environment:
      - NODE_ENV=production
```

#### For Onion Application (`/home/ubuntu/onion/docker-compose.yml`):

```yaml
version: '3.8'
services:
  onion-app:
    build: .
    container_name: onion_app
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
```

---

## Step 3: Configure Supervisor

### Supervisor Configuration for People Application

Create a Supervisor configuration file: `/etc/supervisor/conf.d/people.conf`:

```ini
[program:docker-compose-people]
command=docker-compose -p people up
directory=/home/ubuntu/people
autostart=true
autorestart=true
stderr_logfile=/var/log/docker-compose-people.err.log
stdout_logfile=/var/log/docker-compose-people.out.log
stopasgroup=true
killasgroup=true
```

### Supervisor Configuration for Onion Application

Create a Supervisor configuration file: `/etc/supervisor/conf.d/onion.conf`:

```ini
[program:docker-compose-onion]
command=docker-compose -p onion up
directory=/home/ubuntu/onion
autostart=true
autorestart=true
stderr_logfile=/var/log/docker-compose-onion.err.log
stdout_logfile=/var/log/docker-compose-onion.out.log
stopasgroup=true
killasgroup=true
```

### Reload Supervisor

```bash
sudo supervisorctl reread
sudo supervisorctl update
```

### Start Applications

```bash
sudo supervisorctl start docker-compose-people
sudo supervisorctl start docker-compose-onion
```

---

## Step 4: Configure Apache as a Reverse Proxy

### Enable Required Apache Modules

```bash
sudo a2enmod proxy proxy_http
sudo systemctl restart apache2
```

### Create Virtual Hosts for Applications

#### For People Application

Create `/etc/apache2/sites-available/people.conf`:

```apache
<VirtualHost *:80>
    ServerName people.yourdomain.com

    ProxyPreserveHost On
    ProxyPass / http://localhost:4000/
    ProxyPassReverse / http://localhost:4000/

    ErrorLog ${APACHE_LOG_DIR}/people_error.log
    CustomLog ${APACHE_LOG_DIR}/people_access.log combined
</VirtualHost>
```

#### For Onion Application

Create `/etc/apache2/sites-available/onion.conf`:

```apache
<VirtualHost *:80>
    ServerName onion.yourdomain.com

    ProxyPreserveHost On
    ProxyPass / http://localhost:5000/
    ProxyPassReverse / http://localhost:5000/

    ErrorLog ${APACHE_LOG_DIR}/onion_error.log
    CustomLog ${APACHE_LOG_DIR}/onion_access.log combined
</VirtualHost>
```

### Enable Virtual Hosts

```bash
sudo a2ensite people.conf
sudo a2ensite onion.conf
sudo systemctl restart apache2
```

---

## Step 5: Configure AWS Subdomain and S3

### Set Up Subdomain in AWS Route 53

1. Log in to the AWS Management Console.
2. Navigate to **Route 53**.
3. Create a hosted zone for your domain if not already set up.
4. Add "A" records for subdomains pointing to your server's IP address:
   - `people.yourdomain.com` → Public IP of your server
   - `onion.yourdomain.com` → Public IP of your server

### Set Up S3 for Backups

1. Navigate to **S3** in the AWS Management Console.
2. Create a bucket named `onion-backups`.
3. Enable versioning for the bucket.
4. Configure lifecycle rules to automatically archive or delete older backups.
5. Set up an IAM role for your server with permissions to upload files to S3.

#### Backup Script Example

Create a backup script: `/home/ubuntu/backup.sh`:

```bash
#!/bin/bash
TIMESTAMP=$(date +"%F-%H-%M-%S")
BACKUP_NAME="onion-backup-$TIMESTAMP.sql"

# PostgreSQL Backup
pg_dump -U postgres onion_db > /tmp/$BACKUP_NAME

# Upload to S3
aws s3 cp /tmp/$BACKUP_NAME s3://onion-backups/$BACKUP_NAME

# Cleanup
rm /tmp/$BACKUP_NAME
```

Make it executable:

```bash
chmod +x /home/ubuntu/backup.sh
```

Schedule the script using cron:

```bash
crontab -e
```

Add the following line to run the script every 8 hours:

```bash
0 */8 * * * /home/ubuntu/backup.sh
```

---

## Step 6: Verify Deployment

### Check Supervisor Status

```bash
sudo supervisorctl status
```

### Test Applications

- Open `http://people.yourdomain.com` for the People application.
- Open `http://onion.yourdomain.com` for the Onion application.

---

## Logs and Troubleshooting

### Supervisor Logs

- People: `/var/log/docker-compose-people.err.log`, `/var/log/docker-compose-people.out.log`
- Onion: `/var/log/docker-compose-onion.err.log`, `/var/log/docker-compose-onion.out.log`

### Apache Logs

- People: `/var/log/apache2/people_error.log`, `/var/log/apache2/people_access.log`
- Onion: `/var/log/apache2/onion_error.log`, `/var/log/apache2/onion_access.log`

### Common Commands

- Restart a service: `sudo supervisorctl restart <service-name>`
- Check Docker containers: `docker ps`
- Check Apache syntax: `sudo apachectl configtest`

---

This concludes the deployment guide for People and Onion applications.

