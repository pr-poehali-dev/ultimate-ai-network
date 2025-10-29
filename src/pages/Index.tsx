import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from '@/hooks/use-toast';

const VALID_CODES = [
  'DHEJJEBR', 'DHDHDVV', 'DUDUEJR', 'HXCUUCUC', 'SKSKGBGV',
  'SUDHDV', 'UDHDVRV', 'DIDJSNSB', 'HFHFBF', 'DUFUFVVT',
  'ALALAPL', 'FHFHT', 'VNDKSV', 'HDUEVCCCTJ', 'HEUEVECWL',
  'JSIFVBEJSM', 'JDUFVTVE', 'HSBTBJDK'
];

const AI_MODULES = [
  {
    id: 'website',
    title: 'Генерация сайтов',
    icon: 'Globe',
    description: 'Создание полноценных веб-сайтов за секунды',
    performance: '25x быстрее конкурентов',
    color: 'from-violet-500 to-purple-600'
  },
  {
    id: 'text',
    title: 'Текстовая нейросеть',
    icon: 'MessageSquare',
    description: 'Генерация текста, ответы на вопросы, анализ',
    performance: '25x точнее аналогов',
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 'media',
    title: 'Видео и Фото',
    icon: 'Image',
    description: 'Генерация изображений и видео высочайшего качества',
    performance: '25x качественнее рынка',
    color: 'from-pink-500 to-rose-600'
  },
  {
    id: 'voice',
    title: 'Голосовой ввод',
    icon: 'Mic',
    description: 'Общение голосом с озвучкой ответов',
    performance: '25x натуральнее других',
    color: 'from-orange-500 to-amber-600'
  }
];

export default function Index() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState<'code' | 'login' | 'register'>('code');
  const [code, setCode] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [usedCodes] = useState<string[]>([]);

  const handleCodeSubmit = () => {
    if (VALID_CODES.includes(code.toUpperCase()) && !usedCodes.includes(code.toUpperCase())) {
      setAuthMode('register');
      toast({
        title: '✅ Код принят!',
        description: 'Создайте свой аккаунт',
      });
    } else {
      toast({
        title: '❌ Ошибка',
        description: 'Неверный код или код уже использован',
        variant: 'destructive',
      });
    }
  };

  const handleRegister = () => {
    if (username && password) {
      setIsLoggedIn(true);
      setIsAuthOpen(false);
      toast({
        title: '🎉 Добро пожаловать!',
        description: `Аккаунт ${username} успешно создан`,
      });
    }
  };

  const handleLogin = () => {
    if (username && password) {
      setIsLoggedIn(true);
      setIsAuthOpen(false);
      toast({
        title: '👋 С возвращением!',
        description: 'Вы успешно вошли в систему',
      });
    }
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#2D1B4E] to-[#1A1F2C]">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gradient mb-2">DUWDU1</h1>
              <p className="text-white/60">Панель управления AI</p>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsLoggedIn(false)}
              className="glass-card border-white/20 text-white hover:bg-white/10"
            >
              <Icon name="LogOut" className="mr-2 h-4 w-4" />
              Выход
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {AI_MODULES.map((module) => (
              <Card
                key={module.id}
                className={`glass-card border-white/10 cursor-pointer transition-all hover:scale-105 ${
                  activeModule === module.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setActiveModule(module.id)}
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center mb-4 animate-float`}>
                    <Icon name={module.icon as any} className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-white">{module.title}</CardTitle>
                  <CardDescription className="text-white/60">{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge className="gradient-primary border-0">{module.performance}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          {activeModule && (
            <Card className="glass-card border-white/10 animate-scale-in">
              <CardHeader>
                <CardTitle className="text-white text-2xl">
                  {AI_MODULES.find(m => m.id === activeModule)?.title}
                </CardTitle>
                <CardDescription className="text-white/60">
                  Модуль активен и готов к работе
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-glow"></div>
                    <span className="text-white font-medium">Нейросеть активна</span>
                  </div>
                  
                  {activeModule === 'website' && (
                    <div className="space-y-4">
                      <Input
                        placeholder="Опишите сайт, который хотите создать..."
                        className="glass-card border-white/20 text-white placeholder:text-white/40"
                      />
                      <Button className="w-full gradient-primary text-white font-semibold">
                        <Icon name="Sparkles" className="mr-2 h-4 w-4" />
                        Создать сайт
                      </Button>
                    </div>
                  )}

                  {activeModule === 'text' && (
                    <div className="space-y-4">
                      <Input
                        placeholder="Задайте вопрос или опишите задачу..."
                        className="glass-card border-white/20 text-white placeholder:text-white/40"
                      />
                      <Button className="w-full gradient-primary text-white font-semibold">
                        <Icon name="Send" className="mr-2 h-4 w-4" />
                        Отправить
                      </Button>
                    </div>
                  )}

                  {activeModule === 'media' && (
                    <div className="space-y-4">
                      <Input
                        placeholder="Опишите изображение или видео..."
                        className="glass-card border-white/20 text-white placeholder:text-white/40"
                      />
                      <div className="flex gap-2">
                        <Button className="flex-1 gradient-primary text-white font-semibold">
                          <Icon name="Image" className="mr-2 h-4 w-4" />
                          Фото
                        </Button>
                        <Button className="flex-1 gradient-primary text-white font-semibold">
                          <Icon name="Video" className="mr-2 h-4 w-4" />
                          Видео
                        </Button>
                      </div>
                    </div>
                  )}

                  {activeModule === 'voice' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-center py-12">
                        <Button size="lg" className="gradient-primary text-white font-semibold rounded-full w-24 h-24">
                          <Icon name="Mic" className="h-12 w-12" />
                        </Button>
                      </div>
                      <p className="text-center text-white/60 text-sm">
                        Нажмите на микрофон и начните говорить
                      </p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gradient">20038x</div>
                    <div className="text-sm text-white/60">Превосходство</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gradient">100%</div>
                    <div className="text-sm text-white/60">Точность</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gradient">∞</div>
                    <div className="text-sm text-white/60">Возможности</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#2D1B4E] to-[#1A1F2C] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM4QjVDRjYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTZ2LTZoNnYtem0tNiAwdi02aC02djZoNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-6">
            <Badge className="gradient-accent text-white border-0 px-6 py-2 text-lg font-semibold animate-glow">
              Новая эра искусственного интеллекта
            </Badge>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-gradient mb-6 animate-scale-in">
            DUWDU1
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
            Нейросеть следующего поколения. В 20038 раз мощнее всех существующих решений.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="gradient-primary text-white font-bold text-lg px-8 py-6 hover:scale-105 transition-transform"
              onClick={() => setIsAuthOpen(true)}
            >
              <Icon name="Rocket" className="mr-2 h-5 w-5" />
              Начать работу
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="glass-card border-white/20 text-white font-bold text-lg px-8 py-6 hover:bg-white/10"
              onClick={() => setIsPurchaseOpen(true)}
            >
              <Icon name="ShoppingCart" className="mr-2 h-5 w-5" />
              Купить код — 299₽
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {AI_MODULES.map((module, index) => (
            <Card
              key={module.id}
              className="glass-card border-white/10 hover:scale-105 transition-all animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${module.color} flex items-center justify-center mb-4 animate-float`}>
                  <Icon name={module.icon as any} className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">{module.title}</CardTitle>
                <CardDescription className="text-white/60">{module.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge className="gradient-primary border-0 font-semibold">{module.performance}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="glass-card border-white/10 max-w-4xl mx-auto mb-16 animate-scale-in">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-white mb-4">Революционные преимущества</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: 'Zap', title: 'Молниеносная скорость', desc: 'Обработка запросов в реальном времени' },
                { icon: 'Shield', title: 'Максимальная точность', desc: 'Безошибочные результаты во всех задачах' },
                { icon: 'Cpu', title: 'Мультимодальность', desc: '4 нейросети в одной платформе' },
                { icon: 'Infinity', title: 'Безграничный потенциал', desc: 'Постоянное обучение и улучшение' },
                { icon: 'Lock', title: 'Эксклюзивный доступ', desc: 'Ограниченное количество кодов' },
                { icon: 'TrendingUp', title: 'Будущее уже здесь', desc: 'Опережаем рынок на годы вперёд' }
              ].map((feature, index) => (
                <div key={index} className="flex gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                    <Icon name={feature.icon as any} className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                    <p className="text-white/60 text-sm">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <div className="inline-block p-8 glass-card rounded-2xl border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">Готовы изменить будущее?</h3>
            <Button
              size="lg"
              className="gradient-accent text-white font-bold text-lg px-10 py-6 hover:scale-105 transition-transform"
              onClick={() => setIsAuthOpen(true)}
            >
              <Icon name="Star" className="mr-2 h-5 w-5" />
              Присоединиться сейчас
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
        <DialogContent className="glass-card border-white/20 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl text-gradient">
              {authMode === 'code' && 'Введите код доступа'}
              {authMode === 'register' && 'Создание аккаунта'}
              {authMode === 'login' && 'Вход в аккаунт'}
            </DialogTitle>
            <DialogDescription className="text-white/60">
              {authMode === 'code' && 'Используйте приобретённый код для регистрации'}
              {authMode === 'register' && 'Создайте свой уникальный аккаунт'}
              {authMode === 'login' && 'Войдите в существующий аккаунт'}
            </DialogDescription>
          </DialogHeader>

          <Tabs value={authMode} onValueChange={(v) => setAuthMode(v as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-2 glass-card border-white/10">
              <TabsTrigger value="code">По коду</TabsTrigger>
              <TabsTrigger value="login">Войти</TabsTrigger>
            </TabsList>

            <TabsContent value="code" className="space-y-4">
              {authMode === 'code' && (
                <>
                  <Input
                    placeholder="Введите код доступа"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="glass-card border-white/20 text-white placeholder:text-white/40"
                  />
                  <Button onClick={handleCodeSubmit} className="w-full gradient-primary text-white font-semibold">
                    Проверить код
                  </Button>
                  <div className="text-center">
                    <Button
                      variant="link"
                      className="text-primary hover:text-secondary"
                      onClick={() => setIsPurchaseOpen(true)}
                    >
                      Нет кода? Купить за 299₽
                    </Button>
                  </div>
                </>
              )}
              {authMode === 'register' && (
                <>
                  <Input
                    placeholder="Придумайте никнейм"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="glass-card border-white/20 text-white placeholder:text-white/40"
                  />
                  <Input
                    type="password"
                    placeholder="Придумайте пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="glass-card border-white/20 text-white placeholder:text-white/40"
                  />
                  <Button onClick={handleRegister} className="w-full gradient-primary text-white font-semibold">
                    Создать аккаунт
                  </Button>
                </>
              )}
            </TabsContent>

            <TabsContent value="login" className="space-y-4">
              <Input
                placeholder="Никнейм"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="glass-card border-white/20 text-white placeholder:text-white/40"
              />
              <Input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="glass-card border-white/20 text-white placeholder:text-white/40"
              />
              <Button onClick={handleLogin} className="w-full gradient-primary text-white font-semibold">
                Войти
              </Button>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      <Dialog open={isPurchaseOpen} onOpenChange={setIsPurchaseOpen}>
        <DialogContent className="glass-card border-white/20 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-3xl text-gradient mb-2">Эксклюзивный доступ</DialogTitle>
            <DialogDescription className="text-white/60 text-lg">
              Получите доступ к самой мощной AI-платформе в мире
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-gradient-to-br from-violet-500/20 to-pink-500/20 border border-white/10">
              <div className="text-center mb-6">
                <div className="text-5xl font-black text-gradient mb-2">299₽</div>
                <div className="text-white/60">Единоразовая оплата</div>
              </div>

              <div className="space-y-3">
                {[
                  'Полный доступ ко всем 4 AI-модулям',
                  'Производительность в 20038 раз выше',
                  'Безлимитная генерация контента',
                  'Приоритетная поддержка',
                  'Эксклюзивные обновления'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Icon name="CheckCircle" className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-white">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 glass-card rounded-xl border border-white/10">
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Icon name="Info" className="h-5 w-5 text-primary" />
                Как получить код?
              </h4>
              <ol className="space-y-2 text-white/80 text-sm">
                <li>1. Нажмите кнопку "Перейти в чат" ниже</li>
                <li>2. Напишите в Telegram о покупке кода</li>
                <li>3. Оплатите 299₽ удобным способом</li>
                <li>4. Получите уникальный код активации</li>
                <li>5. Используйте код для создания аккаунта</li>
              </ol>
            </div>

            <Button
              size="lg"
              className="w-full gradient-accent text-white font-bold text-lg py-6 hover:scale-105 transition-transform"
              onClick={() => window.open('https://t.me/LyriumMine', '_blank')}
            >
              <Icon name="MessageCircle" className="mr-2 h-5 w-5" />
              Перейти в чат Telegram
            </Button>

            <p className="text-center text-white/40 text-sm">
              Осталось ограниченное количество кодов. Успейте получить доступ!
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
