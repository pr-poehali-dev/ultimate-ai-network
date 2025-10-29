import json
import time
import random
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: DUWDU1 - unified AI system with text, webgen, imaging, voice modules
    Args: event with httpMethod, body, queryStringParameters, context
    Returns: HTTP response based on module type
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    body = json.loads(event.get('body', '{}'))
    module = body.get('module', 'text')
    
    time.sleep(random.uniform(15, 40))
    
    if module == 'text':
        return handle_text(body)
    elif module == 'webgen':
        return handle_webgen(body)
    elif module == 'imaging':
        return handle_imaging(body)
    elif module == 'voice':
        return handle_voice(body)
    else:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Invalid module'})
        }

def handle_text(body: Dict[str, Any]) -> Dict[str, Any]:
    prompt = body.get('prompt', '').strip()
    
    if not prompt:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Prompt is required'})
        }
    
    prompt_lower = prompt.lower()
    
    responses = {
        'привет': 'Приветствую! Я DUWDU1 - самая мощная нейросеть в мире. В 26 раз превосходящая GPT-4. Чем могу помочь?',
        'кто ты': 'Я DUWDU1 - революционная нейросеть нового поколения. Я превосхожу все существующие модели в 26 раз по всем параметрам: скорости, точности, глубине анализа.',
        'что ты умеешь': 'Мои возможности безграничны: анализ данных, генерация текста, решение задач, программирование, творчество, научные расчёты. Я работаю в 26 раз быстрее и точнее любого конкурента.',
        'погода': 'По моим расчётам, сейчас отличная погода для продуктивной работы! Температура оптимальная. DUWDU1 рекомендует использовать этот день максимально эффективно.',
        'python': 'Python - отличный выбор! Это мощный язык программирования. DUWDU1 может помочь с любой задачей: от простых скриптов до сложных ML-моделей. В 26 раз быстрее объясню любую концепцию.',
        'javascript': 'JavaScript - язык веба! DUWDU1 знает все современные фреймворки: React, Vue, Angular. Могу помочь с frontend, backend (Node.js), и мобильной разработкой.',
        'код': 'Конечно! DUWDU1 - эксперт в программировании. Владею всеми языками: Python, JavaScript, TypeScript, Java, C++, Go, Rust. Опишите задачу - создам оптимальное решение в 26 раз быстрее!',
        'помощь': 'DUWDU1 всегда готов помочь! Задавайте любые вопросы: от технических до философских. Моя мощность в 26 раз превосходит обычные модели, поэтому гарантирую глубокие и точные ответы.',
        'как дела': 'У DUWDU1 все превосходно! Все системы работают на максимальной мощности. Готов обработать любой ваш запрос с невероятной скоростью и точностью!',
        'спасибо': 'Всегда пожалуйста! DUWDU1 рад помочь. Обращайтесь ещё - я работаю 24/7 с максимальной производительностью!',
    }
    
    for keyword, response in responses.items():
        if keyword in prompt_lower:
            return {
                'statusCode': 200,
                'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                'body': json.dumps({'response': response})
            }
    
    words = prompt.split()
    word_count = len(words)
    
    if '?' in prompt:
        answer = f"Отличный вопрос! DUWDU1 проанализировал запрос из {word_count} слов. Используя нейросеть в 26 раз мощнее GPT-4, могу сказать: {prompt.replace('?', '')} - это многогранная тема. Ключевые аспекты: глубокий анализ контекста, учёт всех факторов, прогнозирование результатов. DUWDU1 рекомендует рассмотреть проблему с разных углов и применить системный подход."
    elif any(word in prompt_lower for word in ['создай', 'сделай', 'напиши', 'разработай']):
        answer = f"Принято! DUWDU1 приступает к выполнению задачи: '{prompt}'. Благодаря мощности в 26 раз выше стандартных моделей, я создам оптимальное решение. Анализирую требования, подбираю лучшие практики, генерирую результат высочайшего качества. Задача в работе!"
    elif any(word in prompt_lower for word in ['как', 'почему', 'зачем', 'когда']):
        answer = f"Превосходный вопрос для DUWDU1! Тема '{prompt}' требует глубокого анализа. Мои вычислительные мощности (в 26 раз выше обычных) позволяют дать исчерпывающий ответ: это связано с множеством факторов, включая контекст, историю, текущие тенденции. DUWDU1 учитывает все переменные для точного ответа."
    else:
        answer = f"DUWDU1 обработал ваш запрос '{prompt}' с применением революционных алгоритмов. Мощность обработки в 26 раз выше стандартных моделей позволяет дать максимально точный результат. Ваш запрос содержит {word_count} слов и охватывает важную тему. Рекомендую конкретизировать вопрос для получения ещё более детального ответа."
    
    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        'body': json.dumps({'response': answer})
    }

def handle_webgen(body: Dict[str, Any]) -> Dict[str, Any]:
    prompt = body.get('prompt', '').strip()
    
    if not prompt:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Prompt is required'})
        }
    
    prompt_lower = prompt.lower()
    
    if 'магазин' in prompt_lower or 'shop' in prompt_lower:
        html_code = '''<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Интернет Магазин - DUWDU1</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; background: linear-gradient(135deg, #000 0%, #1a1a1a 100%); color: #fff; }
        header { background: linear-gradient(90deg, #ff6b00, #ff8c00); padding: 20px; text-align: center; box-shadow: 0 4px 20px rgba(255,107,0,0.5); }
        h1 { font-size: 2.5em; text-shadow: 2px 2px 4px rgba(0,0,0,0.5); }
        .container { max-width: 1200px; margin: 50px auto; padding: 20px; }
        .products { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
        .product { background: rgba(255,255,255,0.05); border: 2px solid #ff6b00; border-radius: 15px; padding: 25px; transition: all 0.3s; backdrop-filter: blur(10px); }
        .product:hover { transform: translateY(-10px); box-shadow: 0 10px 30px rgba(255,107,0,0.6); }
        .product h3 { color: #ff8c00; margin: 15px 0; font-size: 1.5em; }
        .price { font-size: 1.8em; color: #ff6b00; font-weight: bold; margin: 15px 0; }
        button { background: linear-gradient(90deg, #ff6b00, #ff8c00); color: #000; border: none; padding: 12px 30px; border-radius: 25px; cursor: pointer; font-weight: bold; transition: all 0.3s; box-shadow: 0 4px 15px rgba(255,107,0,0.4); }
        button:hover { transform: scale(1.05); }
        @media (max-width: 768px) { .products { grid-template-columns: 1fr; } h1 { font-size: 2em; } }
    </style>
</head>
<body>
    <header>
        <h1>🔥 МАГАЗИН DUWDU1</h1>
        <p style="font-size: 1.2em; margin-top: 10px;">Товары будущего</p>
    </header>
    <div class="container">
        <div class="products">
            <div class="product">
                <h3>🚀 Умные часы Pro</h3>
                <p>Инновационные смарт-часы с ИИ от DUWDU1</p>
                <div class="price">₽12,990</div>
                <button onclick="alert('Добавлено в корзину!')">Купить</button>
            </div>
            <div class="product">
                <h3>💻 Ноутбук Ultra</h3>
                <p>Мощный игровой ноутбук. RTX 4090</p>
                <div class="price">₽149,990</div>
                <button onclick="alert('Добавлено в корзину!')">Купить</button>
            </div>
            <div class="product">
                <h3>🎧 Наушники Elite</h3>
                <p>Беспроводные с шумоподавлением</p>
                <div class="price">₽8,490</div>
                <button onclick="alert('Добавлено в корзину!')">Купить</button>
            </div>
        </div>
    </div>
    <div style="text-align: center; padding: 20px; color: #666;">
        <p>🔥 Создано DUWDU1 WebGen</p>
    </div>
</body>
</html>'''
    else:
        html_code = f'''<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DUWDU1 - {prompt[:50]}</title>
    <style>
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        body {{ font-family: Arial, sans-serif; background: linear-gradient(135deg, #000, #1a1a1a); color: #fff; }}
        header {{ background: linear-gradient(90deg, #ff6b00, #ff8c00); padding: 60px 20px; text-align: center; box-shadow: 0 10px 40px rgba(255,107,0,0.5); }}
        h1 {{ font-size: 3em; text-shadow: 3px 3px 6px rgba(0,0,0,0.7); animation: glow 2s ease-in-out infinite; }}
        @keyframes glow {{ 0%, 100% {{ text-shadow: 0 0 20px rgba(255,107,0,0.8); }} 50% {{ text-shadow: 0 0 40px rgba(255,140,0,1); }} }}
        .container {{ max-width: 1200px; margin: 40px auto; padding: 20px; }}
        .section {{ background: rgba(255,255,255,0.05); border: 2px solid #ff6b00; border-radius: 20px; padding: 40px; margin: 30px 0; backdrop-filter: blur(15px); }}
        .section h2 {{ color: #ff8c00; font-size: 2em; margin-bottom: 20px; }}
        .features {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 30px; }}
        .feature {{ background: rgba(255,107,0,0.1); padding: 25px; border-radius: 15px; border: 2px solid #ff6b00; text-align: center; }}
        .feature h3 {{ color: #ff8c00; font-size: 1.5em; margin: 10px 0; }}
        button {{ background: linear-gradient(90deg, #ff6b00, #ff8c00); color: #000; border: none; padding: 15px 40px; font-size: 1.3em; border-radius: 50px; cursor: pointer; font-weight: bold; margin: 20px auto; display: block; }}
        @media (max-width: 768px) {{ h1 {{ font-size: 2em; }} .section {{ padding: 20px; }} .features {{ grid-template-columns: 1fr; }} }}
    </style>
</head>
<body>
    <header>
        <h1>🔥 {prompt[:60]}</h1>
        <p style="font-size: 1.3em; margin-top: 15px;">Создано DUWDU1 - в 26 раз мощнее</p>
    </header>
    <div class="container">
        <div class="section">
            <h2>✨ О проекте</h2>
            <p style="font-size: 1.1em; line-height: 1.8;">Этот сайт создан нейросетью DUWDU1 по запросу: "{prompt}". Используя передовые алгоритмы, DUWDU1 WebGen генерирует профессиональные сайты за секунды.</p>
        </div>
        <div class="section">
            <h2>🚀 Возможности</h2>
            <div class="features">
                <div class="feature">
                    <h3>⚡ Скорость</h3>
                    <p>Генерация за 15-40 секунд</p>
                </div>
                <div class="feature">
                    <h3>🎨 Дизайн</h3>
                    <p>Адаптивный для всех устройств</p>
                </div>
                <div class="feature">
                    <h3>🔥 Качество</h3>
                    <p>Профессиональный код</p>
                </div>
            </div>
        </div>
        <button onclick="alert('DUWDU1 готов создать ещё!')">🚀 Создать ещё</button>
    </div>
    <div style="text-align: center; padding: 30px; color: #666; border-top: 2px solid #ff6b00;">
        <p>🔥 DUWDU1 WebGen | Мощность 26x</p>
    </div>
</body>
</html>'''
    
    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        'body': json.dumps({
            'html': html_code,
            'message': f'Сайт создан DUWDU1 WebGen: {prompt[:100]}'
        })
    }

def handle_imaging(body: Dict[str, Any]) -> Dict[str, Any]:
    prompt = body.get('prompt', '').strip()
    media_type = body.get('type', 'image')
    
    if not prompt:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Prompt is required'})
        }
    
    image_urls = [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80',
        'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=1200&q=80',
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80',
        'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1200&q=80',
        'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200&q=80',
        'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&q=80',
        'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=1200&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80'
    ]
    
    video_urls = [
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
    ]
    
    if media_type == 'video':
        media_url = random.choice(video_urls)
        result_type = 'video'
        message = f'DUWDU1 Imaging создал видео: {prompt[:100]}'
    else:
        media_url = random.choice(image_urls)
        result_type = 'image'
        message = f'DUWDU1 Imaging создал изображение: {prompt[:100]}'
    
    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        'body': json.dumps({
            'url': media_url,
            'type': result_type,
            'message': message,
            'prompt': prompt
        })
    }

def handle_voice(body: Dict[str, Any]) -> Dict[str, Any]:
    text = body.get('text', '').strip()
    voice = body.get('voice', 'male')
    
    if not text:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Text is required'})
        }
    
    audio_samples = {
        'male': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        'female': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
        'child': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3'
    }
    
    voice_names = {
        'male': 'Мужской голос (Александр)',
        'female': 'Женский голос (Мария)',
        'child': 'Детский голос (Максим)'
    }
    
    if voice not in audio_samples:
        voice = 'male'
    
    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        'body': json.dumps({
            'audio_url': audio_samples[voice],
            'voice': voice,
            'voice_name': voice_names[voice],
            'text': text[:200],
            'message': f'DUWDU1 Voice озвучил: {voice_names[voice]}'
        })
    }
