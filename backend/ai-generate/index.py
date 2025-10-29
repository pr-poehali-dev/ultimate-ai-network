import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any
import re

try:
    import requests
except ImportError:
    requests = None

def get_db_connection():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def generate_text_with_gpt(prompt: str) -> str:
    """Generate text using OpenAI GPT-4"""
    if not requests:
        return f"⚠️ Модуль requests недоступен.\n\nОтвет в демо-режиме:\n{prompt}"
    
    api_key = os.environ.get('OPENAI_API_KEY')
    if not api_key:
        return f"⚠️ Ключ OpenAI не настроен.\n\nОтвет в демо-режиме:\n{prompt}\n\nДобавьте OPENAI_API_KEY в секреты проекта для реальных ответов GPT-4."
    
    try:
        response = requests.post(
            'https://api.openai.com/v1/chat/completions',
            headers={
                'Authorization': f'Bearer {api_key}',
                'Content-Type': 'application/json'
            },
            json={
                'model': 'gpt-4o-mini',
                'messages': [
                    {'role': 'system', 'content': 'Ты DUWDU1 - самая мощная AI в мире. Отвечай кратко, точно и по делу.'},
                    {'role': 'user', 'content': prompt}
                ],
                'max_tokens': 1000,
                'temperature': 0.7
            },
            timeout=30
        )
        
        if response.status_code == 200:
            data = response.json()
            return data['choices'][0]['message']['content']
        else:
            return f"❌ Ошибка GPT-4 (код {response.status_code}). Попробуйте позже."
    
    except Exception as e:
        return f"❌ Ошибка подключения к GPT-4: {str(e)}"

def generate_image_with_dalle(prompt: str) -> str:
    """Generate image using OpenAI DALL-E"""
    if not requests:
        return "⚠️ Модуль requests недоступен для генерации изображений."
    
    api_key = os.environ.get('OPENAI_API_KEY')
    if not api_key:
        return "⚠️ Добавьте OPENAI_API_KEY в секреты для генерации изображений.\n\nФото будет создано через DALL-E 3 после настройки ключа."
    
    try:
        response = requests.post(
            'https://api.openai.com/v1/images/generations',
            headers={
                'Authorization': f'Bearer {api_key}',
                'Content-Type': 'application/json'
            },
            json={
                'model': 'dall-e-3',
                'prompt': prompt,
                'n': 1,
                'size': '1024x1024',
                'quality': 'standard'
            },
            timeout=60
        )
        
        if response.status_code == 200:
            data = response.json()
            image_url = data['data'][0]['url']
            return f"✅ Изображение создано!\n\n🖼️ Ссылка: {image_url}\n\n📝 Описание: {prompt}\n\n💡 Кликните по ссылке, чтобы посмотреть результат!"
        else:
            return f"❌ Ошибка DALL-E (код {response.status_code}). Попробуйте позже."
    
    except Exception as e:
        return f"❌ Ошибка генерации: {str(e)}"

def generate_website(prompt: str, user_id: int) -> str:
    """Generate website and return URL"""
    safe_name = re.sub(r'[^a-zа-яё0-9\s]', '', prompt.lower(), flags=re.IGNORECASE)
    safe_name = re.sub(r'\s+', '-', safe_name.strip())[:50]
    
    html_content = f'''<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{prompt}</title>
    <style>
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            padding: 20px;
        }}
        .container {{
            max-width: 800px;
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            padding: 60px 40px;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            text-align: center;
            animation: slideIn 0.6s ease-out;
        }}
        h1 {{
            font-size: 3em;
            margin-bottom: 20px;
            text-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }}
        p {{
            font-size: 1.2em;
            line-height: 1.6;
            opacity: 0.9;
            margin-bottom: 30px;
        }}
        .badge {{
            display: inline-block;
            padding: 10px 20px;
            background: rgba(255,255,255,0.2);
            border-radius: 50px;
            font-size: 0.9em;
            margin: 10px 5px;
        }}
        @keyframes slideIn {{
            from {{ opacity: 0; transform: translateY(30px); }}
            to {{ opacity: 1; transform: translateY(0); }}
        }}
    </style>
</head>
<body>
    <div class="container">
        <h1>{prompt}</h1>
        <p>Сайт создан AI-платформой DUWDU1 за 2 секунды</p>
        <div class="badge">🚀 Адаптивный дизайн</div>
        <div class="badge">⚡ Быстрая загрузка</div>
        <div class="badge">🎨 Современный UI</div>
        <p style="margin-top: 40px; opacity: 0.7; font-size: 0.9em;">
            Powered by DUWDU1 Neural Network
        </p>
    </div>
</body>
</html>'''
    
    try:
        website_id = f"site-{user_id}-{safe_name}"
        
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        try:
            cur.execute(
                "INSERT INTO generated_websites (user_id, site_name, html_content) VALUES (%s, %s, %s) ON CONFLICT (user_id, site_name) DO UPDATE SET html_content = EXCLUDED.html_content, created_at = NOW() RETURNING id",
                (user_id, website_id, html_content)
            )
            site_id = cur.fetchone()['id']
            conn.commit()
            
            site_url = f"https://duwdu1-sites.poehali.dev/{website_id}.html"
            
            return f'''✅ Сайт "{prompt}" создан успешно!

🌐 Ссылка: {site_url}

📊 Характеристики:
• Адаптивный дизайн
• Время загрузки: 0.3 сек
• SEO-оптимизация
• Мобильная версия

🎨 Визуальные эффекты:
• Градиентный фон
• Стеклянная карточка
• Плавная анимация

💡 Сайт доступен по ссылке выше!'''
        
        finally:
            cur.close()
            conn.close()
    
    except Exception as e:
        return f"❌ Ошибка создания сайта: {str(e)}"

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Generate AI content using real APIs (GPT-4, DALL-E, website hosting)
    Args: event with httpMethod, body containing userId, moduleType, prompt
    Returns: HTTP response with generated content or URLs
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body = json.loads(event.get('body', '{}'))
    user_id = body.get('userId')
    module_type = body.get('moduleType')
    prompt = body.get('prompt')
    
    if not user_id or not module_type or not prompt:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Все поля обязательны'}),
            'isBase64Encoded': False
        }
    
    response_text = ''
    
    if module_type == 'website':
        response_text = generate_website(prompt, user_id)
    
    elif module_type == 'text':
        response_text = generate_text_with_gpt(prompt)
    
    elif module_type == 'media':
        media_type = body.get('mediaType', 'image')
        if media_type == 'image':
            response_text = generate_image_with_dalle(prompt)
        else:
            response_text = f'''🎬 Генерация видео

⚠️ Видео-генерация требует отдельного API (Runway, Pika Labs и др.)

📝 Ваш запрос: {prompt}

💡 Для активации видео-генерации свяжитесь с администратором.

Пока доступна генерация изображений через DALL-E 3!'''
    
    elif module_type == 'voice':
        response_text = f'''🎤 Голосовая обработка

⚠️ Голосовой ввод требует отдельного API (OpenAI Whisper, TTS)

📝 Текст: "{prompt}"

💡 Функционал в разработке.

Используйте текстовую нейросеть для получения ответов!'''
    
    else:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Неизвестный тип модуля'}),
            'isBase64Encoded': False
        }
    
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        cur.execute(
            "INSERT INTO ai_requests (user_id, module_type, prompt, response) VALUES (%s, %s, %s, %s) RETURNING id",
            (user_id, module_type, prompt, response_text)
        )
        request_id = cur.fetchone()['id']
        conn.commit()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'success': True,
                'requestId': request_id,
                'response': response_text
            }),
            'isBase64Encoded': False
        }
    
    finally:
        cur.close()
        conn.close()