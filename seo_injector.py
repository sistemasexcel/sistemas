import os
import re
import glob

domain = "https://sistemasexcel.site/"
html_files = glob.glob("*.html")

for file in html_files:
    try:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        enc = 'utf-8'
    except UnicodeDecodeError:
        with open(file, 'r', encoding='utf-16') as f:
            content = f.read()
        enc = 'utf-16'
        
    if '<link rel="canonical"' in content:
        print(f"Skipping {file}, already has canonical tag.")
        continue
        
    title_match = re.search(r'<title>(.*?)</title>', content, re.IGNORECASE | re.DOTALL)
    title = title_match.group(1).strip() if title_match else "Sistemas Excel"
    
    desc_match = re.search(r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']\s*/?>', content, re.IGNORECASE | re.DOTALL)
    description = desc_match.group(1).strip() if desc_match else "Sistemas Excel y automatización en VBA."
    
    if file.lower() == 'index.html':
        url = domain
    else:
        url = domain + file
        
    og_tags = f"""
    <!-- SEO & Open Graph Tags Added Automatically -->
    <link rel="canonical" href="{url}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="{url}" />
    <meta property="og:title" content="{title}" />
    <meta property="og:description" content="{description}" />
    <meta property="og:image" content="{domain}img/logo.jpeg" />
    <meta name="twitter:card" content="summary_large_image" />
"""

    new_content = re.sub(r'</head>', f'{og_tags}</head>', content, flags=re.IGNORECASE)
    
    with open(file, 'w', encoding=enc) as f:
        f.write(new_content)
    print(f"Updated {file} with Canonical and OG tags.")
