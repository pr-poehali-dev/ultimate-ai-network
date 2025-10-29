import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { toast } from '@/hooks/use-toast';

const DUWDU1_API = 'https://functions.poehali.dev/3d0e0115-283a-4cdf-9d1e-0cb406ac4bf8';

const AI_MODULES = [
  {
    id: 'text',
    title: 'DUWDU1 Нейросеть',
    icon: 'Zap',
    description: 'Революционная ИИ-система в 26 раз мощнее GPT-4',
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 'webgen',
    title: 'WebGen',
    icon: 'Globe',
    description: 'Создание профессиональных сайтов за секунды',
    color: 'from-orange-600 to-amber-500'
  },
  {
    id: 'imaging',
    title: 'Imaging',
    icon: 'Image',
    description: 'Генерация фото и видео невиданного качества',
    color: 'from-amber-500 to-orange-500'
  },
  {
    id: 'voice',
    title: 'Voice',
    icon: 'Mic',
    description: 'Голосовой интерфейс с человеческой интонацией',
    color: 'from-orange-400 to-orange-600'
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

      const response = await fetch(DUWDU1_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      if (response.ok) {
        setAiResponse(data);
        toast({
          title: '✅ Готово!',
          description: 'DUWDU1 обработал запрос',
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

  const downloadMedia = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      title: '📥 Скачивание',
      description: 'Файл открыт в новой вкладке',
    });
  };

  const openWebsite = (html: string) => {
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(html);
      newWindow.document.close();
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZjZiMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDMwaC02di02aDZ2LTZ6bS02IDB2LTZoLTZ2Nmg2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-orange-600/5"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10 max-w-6xl">
        <div className="text-center mb-12">
          <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-black border-0 px-4 py-1.5 text-sm font-bold mb-4">
            🔥 Революция в мире нейросетей
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black text-gradient mb-4 tracking-tight">
            DUWDU1
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-2 max-w-2xl mx-auto">
            Нейросеть нового поколения, которая <span className="text-orange-500 font-bold">в 26 раз превосходит</span> GPT-4
          </p>
          <p className="text-xl md:text-2xl font-bold text-gradient">
            За нами бушующие
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {AI_MODULES.map((module) => (
            <Card
              key={module.id}
              className={`glass-card border-orange-500/30 cursor-pointer transition-all duration-300 hover:scale-105 hover:border-orange-500 ${
                activeModule === module.id ? 'border-orange-500 shadow-lg shadow-orange-500/30' : ''
              }`}
              onClick={() => {
                setActiveModule(module.id);
                setPrompt('');
                setAiResponse(null);
              }}
            >
              <CardHeader className="p-4">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${module.color} flex items-center justify-center mb-2 shadow-lg shadow-orange-500/50`}>
                  <Icon name={module.icon as any} className="h-5 w-5 text-black" />
                </div>
                <CardTitle className="text-white text-base">{module.title}</CardTitle>
                <CardDescription className="text-white/70 text-sm line-clamp-2">{module.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {activeModule && (
          <Card className="glass-card border-orange-500/30 shadow-2xl shadow-orange-500/10">
            <CardHeader className="pb-4">
              <CardTitle className="text-white text-xl flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                {AI_MODULES.find(m => m.id === activeModule)?.title} активен
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 rounded-lg p-4 border border-orange-500/20">
                
                {activeModule === 'text' && (
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Задайте вопрос DUWDU1..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="bg-black/50 border-orange-500/30 text-white placeholder:text-white/50 min-h-[100px] focus:border-orange-500"
                    />
                    <Button 
                      onClick={handleAiGenerate} 
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-black font-bold shadow-lg shadow-orange-500/50 hover:shadow-orange-500/70"
                    >
                      {isLoading ? (
                        <>
                          <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                          Обработка 15-40 сек...
                        </>
                      ) : (
                        <>
                          <Icon name="Send" className="mr-2 h-4 w-4" />
                          Отправить
                        </>
                      )}
                    </Button>
                  </div>
                )}

                {activeModule === 'webgen' && (
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Опишите сайт для DUWDU1..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="bg-black/50 border-orange-500/30 text-white placeholder:text-white/50 min-h-[100px] focus:border-orange-500"
                    />
                    <Button 
                      onClick={handleAiGenerate} 
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-black font-bold shadow-lg shadow-orange-500/50"
                    >
                      {isLoading ? (
                        <>
                          <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                          Создание 15-40 сек...
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
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Опишите изображение или видео..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="bg-black/50 border-orange-500/30 text-white placeholder:text-white/50 min-h-[100px] focus:border-orange-500"
                    />
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => { setMediaType('image'); handleAiGenerate(); }} 
                        disabled={isLoading}
                        className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-black font-bold shadow-lg shadow-orange-500/50"
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
                        className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-black font-bold shadow-lg shadow-orange-500/50"
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
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Текст для озвучки..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="bg-black/50 border-orange-500/30 text-white placeholder:text-white/50 min-h-[100px] focus:border-orange-500"
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
                          className={selectedVoice === voice.id ? 'bg-orange-500 text-black' : 'border-orange-500/30 text-white hover:bg-orange-500/20'}
                        >
                          {voice.name}
                        </Button>
                      ))}
                    </div>
                    <Button 
                      onClick={handleAiGenerate} 
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-black font-bold shadow-lg shadow-orange-500/50"
                    >
                      {isLoading ? (
                        <>
                          <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                          Озвучивание 15-40 сек...
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
                  <div className="mt-4 p-4 bg-gradient-to-br from-orange-500/10 to-transparent rounded-lg border border-orange-500/30">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-500/50">
                        <Icon name="Sparkles" className="h-4 w-4 text-black" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-semibold mb-2">Результат DUWDU1</h4>
                        
                        {activeModule === 'text' && aiResponse.response && (
                          <p className="text-white/90 text-sm leading-relaxed whitespace-pre-wrap">
                            {aiResponse.response}
                          </p>
                        )}

                        {activeModule === 'webgen' && aiResponse.html && (
                          <div className="space-y-3">
                            <p className="text-white/90 text-sm">{aiResponse.message}</p>
                            <div className="flex gap-2">
                              <Button
                                onClick={() => openWebsite(aiResponse.html)}
                                className="bg-orange-500 text-black hover:bg-orange-600"
                              >
                                <Icon name="ExternalLink" className="mr-2 h-4 w-4" />
                                Открыть сайт
                              </Button>
                              <Button
                                onClick={() => {
                                  navigator.clipboard.writeText(aiResponse.html);
                                  toast({ title: '✅ Скопировано!', description: 'HTML код в буфере' });
                                }}
                                variant="outline"
                                className="border-orange-500/30 text-white hover:bg-orange-500/20"
                              >
                                <Icon name="Copy" className="mr-2 h-4 w-4" />
                                Копировать HTML
                              </Button>
                            </div>
                          </div>
                        )}

                        {activeModule === 'imaging' && aiResponse.url && (
                          <div className="space-y-3">
                            <p className="text-white/90 text-sm mb-2">{aiResponse.message}</p>
                            {aiResponse.type === 'image' ? (
                              <img 
                                src={aiResponse.url} 
                                alt="Generated" 
                                className="w-full rounded-lg border border-orange-500/30 shadow-lg"
                              />
                            ) : (
                              <video 
                                src={aiResponse.url} 
                                controls 
                                className="w-full rounded-lg border border-orange-500/30 shadow-lg"
                              />
                            )}
                            <Button
                              onClick={() => downloadMedia(aiResponse.url, `duwdu1-${aiResponse.type}.${aiResponse.type === 'image' ? 'jpg' : 'mp4'}`)}
                              className="w-full bg-orange-500 text-black hover:bg-orange-600"
                            >
                              <Icon name="Download" className="mr-2 h-4 w-4" />
                              Скачать {aiResponse.type === 'image' ? 'фото' : 'видео'}
                            </Button>
                          </div>
                        )}

                        {activeModule === 'voice' && aiResponse.audio_url && (
                          <div className="space-y-3">
                            <p className="text-white/90 text-sm mb-2">{aiResponse.message}</p>
                            <audio 
                              src={aiResponse.audio_url} 
                              controls 
                              className="w-full"
                            />
                            <p className="text-white/70 text-xs">Озвучен текст: {aiResponse.text}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="text-center">
                  <div className="text-2xl font-black text-gradient">26x</div>
                  <div className="text-xs text-white/70">Мощнее GPT-4</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-gradient">100%</div>
                  <div className="text-xs text-white/70">Точность</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-gradient">∞</div>
                  <div className="text-xs text-white/70">Возможности</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="text-center mt-8 text-white/40 text-sm">
          <p>🔥 DUWDU1 - За нами бушующие | Все модули работают без API ключей</p>
        </div>
      </div>
    </div>
  );
}
