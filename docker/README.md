# Docker Configuration for VitePress Multilingual Site

## Nginx Configuration

The `nginx.conf` file is configured to handle VitePress multilingual sites automatically.

### Default Language Configuration

The default language is set in the root redirect:

```nginx
location = / {
    return 302 /zh/;  # Change /zh/ to your default language
}
```

**Supported language codes:**
- `/zh/` - Chinese (中文)
- `/en/` - English
- `/ja/` - Japanese (日本語)
- `/ko/` - Korean (한국어)
- `/es/` - Spanish (Español)
- `/fr/` - French (Français)
- ... or any other language code

### Adding New Languages

1. **Add language to VitePress config** (`docs/.vitepress/config.js`):
   ```javascript
   locales: {
     // ... existing locales
     ja: {
       label: '日本語',
       lang: 'ja-JP',
       // ... other config
     }
   }
   ```

2. **Create language directory** (`docs/ja/`):
   ```
   docs/
     ja/
       index.md
       guide/
       ...
   ```

3. **No Nginx changes needed!** The configuration automatically handles all language paths.

4. **(Optional) Update default language** if needed:
   ```nginx
   # In docker/nginx.conf
   location = / {
       return 302 /ja/;  # Changed to Japanese
   }
   ```

### How It Works

The Nginx configuration uses a flexible routing approach:

```nginx
location / {
    try_files $uri $uri/ $uri/index.html /zh/index.html;
}
```

This means:
1. Try to serve the exact file (`/zh/guide.html`)
2. Try to serve as directory (`/zh/guide/`)
3. Try to serve with index.html (`/zh/guide/index.html`)
4. Fallback to default language index (`/zh/index.html`)

**No language list hard-coding required!**

### Testing

```bash
# Build the image
docker build -t devify-home-test .

# Run the container
docker run -d -p 8080:80 devify-home-test

# Test different languages
curl -I http://localhost:8080/          # Should redirect to /zh/
curl http://localhost:8080/zh/          # Chinese content
curl http://localhost:8080/en/          # English content
curl http://localhost:8080/ja/          # Japanese content (if configured)
```

## Dockerfile

The Dockerfile removes Nginx's default `index.html` to prevent conflicts:

```dockerfile
RUN rm -f /usr/share/nginx/html/index.html
```

This ensures VitePress content is always served, not Nginx defaults.

