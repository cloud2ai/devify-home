# Docker Configuration for VitePress Multilingual Site

## Nginx Configuration

The `nginx.conf` file is configured to handle VitePress multilingual sites automatically.

### Language Handling 🌍

**Default Language Redirect:**
- Root path (`/`) redirects to Chinese (`/zh/`)
- Simple, reliable, no complex detection logic

**VitePress Language Selector:**
- VitePress automatically shows language switcher in navigation
- Users can easily switch between languages
- **Choice is saved in browser localStorage**
- Next visit automatically uses saved preference

**How it works:**
1. First visit → Redirects to `/zh/` (default)
2. User switches to English via language selector
3. VitePress saves choice in localStorage
4. Next visit → Automatically shows English!

**Want true auto-detection?**
See `LANGUAGE_DETECTION.md` for VitePress native language detection setup.

**Changing default language:**
```nginx
# In nginx.conf
location = / {
    return 302 /en/;  # Change to /en/, /ja/, etc.
}
```

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

# Test default redirect
curl -I http://localhost:8080/          # Should redirect to /zh/

# Test language pages
curl http://localhost:8080/zh/          # Chinese content
curl http://localhost:8080/en/          # English content

# Test in browser
# Open http://localhost:8080/
# Use VitePress language selector to switch languages
# Reload page - your choice is remembered!
```

## Dockerfile

The Dockerfile removes Nginx's default `index.html` to prevent conflicts:

```dockerfile
RUN rm -f /usr/share/nginx/html/index.html
```

This ensures VitePress content is always served, not Nginx defaults.
