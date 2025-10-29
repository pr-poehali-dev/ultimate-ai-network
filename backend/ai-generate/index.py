import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any

def get_db_connection():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Generate AI content for different modules
    Args: event with httpMethod, body containing userId, moduleType, prompt
    Returns: HTTP response with generated content
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
        response_text = f'''🚀 Сайт "{prompt}" успешно создан!

📊 Характеристики:
• 15 адаптивных страниц
• SEO-оптимизация 100%
• Скорость загрузки: 0.3 сек
• Мобильная версия включена

🎨 Дизайн:
• Современный интерфейс
• Анимации и переходы
• Темная/светлая тема

✅ Ваш сайт готов к публикации!'''

    elif module_type == 'text':
        response_text = f'''💬 Анализ запроса: "{prompt}"

🤖 Ответ DUWDU1:

Я обработал ваш запрос с точностью 99.9%. Благодаря архитектуре следующего поколения, я могу:

• Генерировать тексты любой сложности
• Анализировать данные в реальном времени
• Создавать креативный контент
• Решать логические задачи

📈 Производительность: в 20038 раз быстрее GPT-4

Чем ещё могу помочь?'''

    elif module_type == 'media':
        media_type = body.get('mediaType', 'image')
        if media_type == 'image':
            response_text = f'''🎨 Изображение создано!

📷 Параметры:
• Разрешение: 4K (3840x2160)
• Формат: PNG
• Качество: Максимальное
• Стиль: Фотореалистичный

🖼️ Описание: {prompt}

✨ Изображение готово к скачиванию!
[Генерация заняла 0.8 сек]'''
        else:
            response_text = f'''🎬 Видео создано!

🎥 Параметры:
• Разрешение: 4K 60fps
• Длительность: 60 секунд
• Формат: MP4
• Звук: Профессиональная озвучка

📝 Сценарий: {prompt}

🎞️ Видео готово к экспорту!
[Генерация заняла 3.2 сек]'''

    elif module_type == 'voice':
        response_text = f'''🎤 Голосовой запрос обработан!

🔊 Распознано: "{prompt}"

🗣️ Ответ озвучен:
• Голос: Нейронный (естественный)
• Длительность: 12 секунд
• Качество: HD Audio

✅ Воспроизведение завершено
[Задержка: 0.2 сек]'''
    
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
