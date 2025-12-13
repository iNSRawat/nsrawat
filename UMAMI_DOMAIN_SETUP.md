# Umami Domain Configuration Guide for nsrawat.in

This guide will help you configure Umami analytics to work with your custom domain `nsrawat.in/share/7INnZc4Dv9KbGumx`.

## Prerequisites

- Access to your DNS provider (where `nsrawat.in` is managed)
- A server/VPS where Umami is or will be hosted
- SSH access to your server
- Basic knowledge of Nginx configuration

## Option 1: Using Umami Cloud with Custom Domain (Easiest)

If you're using Umami Cloud, you typically cannot use a custom domain for the share URL. The share URL format is:
- `https://cloud.umami.is/share/[share-id]`

**However**, if Umami Cloud supports custom domains, you would need to:
1. Contact Umami Cloud support to enable custom domain
2. Configure DNS CNAME record pointing to their servers
3. They will provide SSL certificate

## Option 2: Self-Hosted Umami with Custom Domain (Recommended)

If you want full control, self-host Umami and configure it with your domain.

### Step 1: Install Umami on Your Server

Follow the official Umami installation guide:
- [Umami Installation Docs](https://umami.is/docs/install)

### Step 2: Configure DNS

Add an A record or CNAME in your DNS provider:

**Option A: Use subdomain (Recommended)**
```
Type: A or CNAME
Name: analytics (or umami)
Value: Your server IP address or hostname
TTL: 3600
```

This would make Umami accessible at `https://analytics.nsrawat.in`

**Option B: Use path on main domain**
```
Type: A
Name: @ (or nsrawat.in)
Value: Your server IP address
TTL: 3600
```

This would make Umami accessible at `https://nsrawat.in/share/...`

### Step 3: Configure Nginx Reverse Proxy

Create or edit your Nginx configuration file (usually at `/etc/nginx/sites-available/nsrawat.in`):

```nginx
server {
    listen 80;
    server_name nsrawat.in www.nsrawat.in;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name nsrawat.in www.nsrawat.in;

    # SSL Certificate Configuration
    ssl_certificate /etc/letsencrypt/live/nsrawat.in/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/nsrawat.in/privkey.pem;
    
    # SSL Configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Main site location (your Next.js portfolio)
    location / {
        proxy_pass http://localhost:3000;  # Your Next.js app port
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Umami share URL location
    location /share/ {
        proxy_pass http://localhost:3001;  # Umami port (adjust if different)
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Umami API and script endpoints
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /script.js {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Step 4: Configure Umami Environment Variables

In your Umami installation, set the `BASE_PATH` environment variable if needed:

```bash
# In your Umami .env file or environment
BASE_PATH=/share  # Only if using path-based routing
```

Or configure Umami to work at the root if using a subdomain.

### Step 5: Set Up SSL Certificate

Install Certbot and get SSL certificate:

```bash
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d nsrawat.in -d www.nsrawat.in
```

### Step 6: Test and Reload Nginx

```bash
# Test Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### Step 7: Update Your Portfolio Configuration

Update `data/siteMetadata.js`:

```javascript
analytics: {
  umamiAnalytics: {
    umamiWebsiteId: process.env.UMAMI_WEBSITE_ID,
    umamiScriptSrc: 'https://nsrawat.in/script.js',  // Update this
  },
},
```

And keep:
```javascript
analyticsURL: 'https://nsrawat.in/share/7INnZc4Dv9KbGumx',
```

## Option 3: Using Subdomain (Cleaner Setup)

If you prefer a cleaner setup, use a subdomain:

### DNS Configuration:
```
Type: A or CNAME
Name: analytics
Value: Your server IP
```

### Nginx Configuration for Subdomain:

```nginx
server {
    listen 443 ssl http2;
    server_name analytics.nsrawat.in;

    ssl_certificate /etc/letsencrypt/live/analytics.nsrawat.in/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/analytics.nsrawat.in/privkey.pem;

    location / {
        proxy_pass http://localhost:3001;  # Umami port
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Then update `siteMetadata.js`:
```javascript
analyticsURL: 'https://analytics.nsrawat.in/share/7INnZc4Dv9KbGumx',
umamiScriptSrc: 'https://analytics.nsrawat.in/script.js',
```

## Troubleshooting

1. **404 Error on `/share/` path**: 
   - Check Umami is running on the correct port
   - Verify Nginx proxy_pass is pointing to correct Umami instance
   - Check Umami BASE_PATH configuration

2. **SSL Certificate Issues**:
   - Ensure DNS is properly configured and propagated
   - Verify port 80 and 443 are open in firewall
   - Check Certbot logs: `sudo certbot certificates`

3. **Script.js not loading**:
   - Verify the script endpoint is accessible
   - Check browser console for CORS errors
   - Ensure Content Security Policy allows the domain

4. **Share URL not working**:
   - Verify the share ID `7INnZc4Dv9KbGumx` is correct in Umami dashboard
   - Check Umami logs for errors
   - Ensure share URL is enabled in Umami settings

## Verification Steps

1. Test Umami is accessible: `https://nsrawat.in/share/7INnZc4Dv9KbGumx`
2. Test script loads: `https://nsrawat.in/script.js`
3. Check browser console for errors
4. Verify analytics data is being collected

## Additional Resources

- [Umami Documentation](https://umami.is/docs)
- [Nginx Reverse Proxy Guide](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/)
- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)
