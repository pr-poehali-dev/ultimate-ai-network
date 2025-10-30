import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { toast } from '@/hooks/use-toast';

const DUWDU_API = 'https://functions.poehali.dev/3d0e0115-283a-4cdf-9d1e-0cb406ac4bf8';

const AI_MODULES = [
  {
    id: 'text',
    title: 'DUWDU Нейросеть',
    icon: 'Brain',
    description: 'Поиск в интернете, обучение на запросах',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'webgen',
    title: 'WebGen',
    icon: 'Globe',
    description: 'Создание реальных сайтов по запросу',
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'imaging',
    title: 'Imaging',
    icon: 'Image',
    description: 'Генерация через Шедеврум',
    color: 'from-pink-500 to-pink-600'
  },
  {
    id: 'voice',
    title: 'Voice',
    icon: 'Mic',
    description: 'Озвучка текста с поиском голосов',
    color: 'from-green-500 to-green-600'
  }
];

export default function Index() {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState('male');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');

  const handleAiGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: '⚠️ Ошибка',
        description: 'Введите запрос',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setAiResponse(null);

    try {
      const requestBody: any = {
        module: activeModule
      };

      if (activeModule === 'text') {
        requestBody.prompt = prompt;
      } else if (activeModule === 'webgen') {
        requestBody.prompt = prompt;
      } else if (activeModule === 'imaging') {
        requestBody.prompt = prompt;
        requestBody.type = mediaType;
      } else if (activeModule === 'voice') {
        requestBody.text = prompt;
        requestBody.voice = selectedVoice;
      }

      const response = await fetch(DUWDU_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      if (response.ok) {
        setAiResponse(data);
        toast({
          title: '✅ Готово!',
          description: 'DUWDU обработал запрос',
        });
      } else {
        throw new Error(data.error || 'Ошибка');
      }
    } catch (error: any) {
      toast({
        title: '❌ Ошибка',
        description: error.message || 'Не удалось обработать запрос',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openWebsite = (html: string) => {
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(html);
      newWindow.document.close();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM4YjVjZjYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDMwaC02di02aDZ2LTZ6bS02IDB2LTZoLTZ2Nmg2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
      
      <div className="container mx-auto px-4 py-8 relative z-10 max-w-6xl">
        <div className="text-center mb-8">
          <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 px-4 py-1.5 text-sm font-bold mb-3">
            ⚡ Нейросеть сквозь время
          </Badge>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-3 tracking-tight">
            DUWDU
          </h1>
          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto">
            Обучение на вопросах • Поиск в интернете • Генерация сайтов
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {AI_MODULES.map((module) => (
            <Card
              key={module.id}
              className={`glass-card border-purple-500/30 cursor-pointer transition-all duration-300 hover:scale-105 hover:border-purple-400 ${
                activeModule === module.id ? 'border-purple-400 shadow-lg shadow-purple-500/30' : ''
              }`}
              onClick={() => {
                setActiveModule(module.id);
                setPrompt('');
                setAiResponse(null);
              }}
            >
              <CardHeader className="p-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${module.color} flex items-center justify-center mb-2 shadow-lg`}>
                  <Icon name={module.icon as any} className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-white text-sm">{module.title}</CardTitle>
                <CardDescription className="text-white/70 text-xs line-clamp-2">{module.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {activeModule && (
          <Card className="glass-card border-purple-500/30 shadow-2xl shadow-purple-500/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                {AI_MODULES.find(m => m.id === activeModule)?.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/5 rounded-lg p-3 border border-purple-500/20">
                
                {activeModule === 'text' && (
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Например: Как приготовить гречневую молочную кашу?"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="bg-black/50 border-purple-500/30 text-white placeholder:text-white/50 min-h-[80px] focus:border-purple-400 text-sm"
                    />
                    <Button 
                      onClick={handleAiGenerate} 
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold shadow-lg hover:shadow-purple-500/50"
                    >
                      {isLoading ? (
                        <>
                          <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                          Ищу в интернете...
                        </>
                      ) : (
                        <>
                          <Icon name="Search" className="mr-2 h-4 w-4" />
                          Найти ответ
                        </>
                      )}
                    </Button>
                  </div>
                )}

                {activeModule === 'webgen' && (
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Например: Создай сайт про котиков"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="bg-black/50 border-purple-500/30 text-white placeholder:text-white/50 min-h-[80px] focus:border-purple-400 text-sm"
                    />
                    <Button 
                      onClick={handleAiGenerate} 
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold shadow-lg"
                    >
                      {isLoading ? (
                        <>
                          <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                          Создаю сайт...
                        </>
                      ) : (
                        <>
                          <Icon name="Sparkles" className="mr-2 h-4 w-4" />
                          Создать сайт
                        </>
                      )}
                    </Button>
                  </div>
                )}

                {activeModule === 'imaging' && (
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Например: Нарисуй котика"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="bg-black/50 border-purple-500/30 text-white placeholder:text-white/50 min-h-[80px] focus:border-purple-400 text-sm"
                    />
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => { setMediaType('image'); handleAiGenerate(); }} 
                        disabled={isLoading}
                        className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold shadow-lg"
                      >
                        {isLoading && mediaType === 'image' ? (
                          <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Icon name="Image" className="mr-2 h-4 w-4" />
                        )}
                        Фото
                      </Button>
                      <Button 
                        onClick={() => { setMediaType('video'); handleAiGenerate(); }} 
                        disabled={isLoading}
                        className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold shadow-lg"
                      >
                        {isLoading && mediaType === 'video' ? (
                          <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Icon name="Video" className="mr-2 h-4 w-4" />
                        )}
                        Видео
                      </Button>
                    </div>
                  </div>
                )}

                {activeModule === 'voice' && (
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Текст для озвучки..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="bg-black/50 border-purple-500/30 text-white placeholder:text-white/50 min-h-[80px] focus:border-purple-400 text-sm"
                    />
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'male', name: '👨 Мужской' },
                        { id: 'female', name: '👩 Женский' },
                        { id: 'child', name: '👦 Детский' }
                      ].map((voice) => (
                        <Button
                          key={voice.id}
                          variant={selectedVoice === voice.id ? 'default' : 'outline'}
                          onClick={() => setSelectedVoice(voice.id)}
                          className={selectedVoice === voice.id ? 'bg-green-500 text-white text-xs' : 'border-green-500/30 text-white hover:bg-green-500/20 text-xs'}
                        >
                          {voice.name}
                        </Button>
                      ))}
                    </div>
                    <Button 
                      onClick={handleAiGenerate} 
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold shadow-lg"
                    >
                      {isLoading ? (
                        <>
                          <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                          Озвучиваю...
                        </>
                      ) : (
                        <>
                          <Icon name="Mic" className="mr-2 h-4 w-4" />
                          Озвучить
                        </>
                      )}
                    </Button>
                  </div>
                )}

                {aiResponse && (
                  <div className="mt-3 p-3 bg-gradient-to-br from-purple-500/10 to-transparent rounded-lg border border-purple-500/30">
                    <div className="flex items-start gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Icon name="Sparkles" className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-semibold mb-1 text-sm">Результат</h4>
                        
                        {activeModule === 'text' && aiResponse.response && (
                          <div className="space-y-2">
                            <p className="text-white/90 text-sm leading-relaxed whitespace-pre-wrap">
                              {aiResponse.response}
                            </p>
                            {aiResponse.learned && (
                              <div className="flex gap-2 text-xs">
                                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                                  {aiResponse.new_knowledge ? '🆕 Изучено' : '💾 Из базы'}
                                </Badge>
                                {aiResponse.used_times && (
                                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                                    📊 Использовано: {aiResponse.used_times}
                                  </Badge>
                                )}
                              </div>
                            )}
                          </div>
                        )}

                        {activeModule === 'webgen' && aiResponse.html && (
                          <div className="space-y-2">
                            <p className="text-white/90 text-sm">{aiResponse.message}</p>
                            <div className="flex gap-2">
                              <Button
                                onClick={() => openWebsite(aiResponse.html)}
                                className="bg-purple-500 text-white hover:bg-purple-600 text-sm h-8"
                                size="sm"
                              >
                                <Icon name="ExternalLink" className="mr-1 h-3 w-3" />
                                Открыть сайт
                              </Button>
                              <Button
                                onClick={() => {
                                  navigator.clipboard.writeText(aiResponse.html);
                                  toast({ title: '✅ Скопировано!', description: 'HTML код в буфере' });
                                }}
                                variant="outline"
                                className="border-purple-500/30 text-white hover:bg-purple-500/20 text-sm h-8"
                                size="sm"
                              >
                                <Icon name="Copy" className="mr-1 h-3 w-3" />
                                HTML
                              </Button>
                            </div>
                          </div>
                        )}

                        {activeModule === 'imaging' && aiResponse.url && (
                          <div className="space-y-2">
                            <p className="text-white/90 text-xs mb-1">{aiResponse.message}</p>
                            {aiResponse.type === 'image' ? (
                              <img 
                                src={aiResponse.url} 
                                alt="Generated" 
                                className="w-full rounded-lg border border-purple-500/30 shadow-lg"
                              />
                            ) : (
                              <video 
                                src={aiResponse.url} 
                                controls 
                                className="w-full rounded-lg border border-purple-500/30 shadow-lg"
                              />
                            )}
                            {aiResponse.shedevrum_used && (
                              <Badge className="bg-pink-500/20 text-pink-300 border-pink-500/30 text-xs">
                                🎨 Создано через Шедеврум
                              </Badge>
                            )}
                          </div>
                        )}

                        {activeModule === 'voice' && aiResponse.audio_url && (
                          <div className="space-y-2">
                            <p className="text-white/90 text-sm mb-1">{aiResponse.message}</p>
                            <audio 
                              src={aiResponse.audio_url} 
                              controls 
                              className="w-full"
                            />
                            <p className="text-white/70 text-xs">Текст: {aiResponse.text}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="text-center mt-6 text-white/40 text-xs">
          <p>⚡ DUWDU — Нейросеть сквозь время | Обучение • Поиск • Генерация</p>
        </div>
      </div>
    </div>
  );
}
