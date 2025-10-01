// src/components/Map.tsx
'use client';

import { useRef } from 'react';
import { YMaps, Map as YandexMap } from '@pbe/react-yandex-maps';
import eventBus from '@/lib/eventBus';

export default function Map() {
  const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY;
  const mapRef = useRef<ymaps.Map | undefined>(undefined);

  const handleFullscreenExit = () => {
    if (mapRef.current) {
      setTimeout(() => {
        mapRef.current!.container.fitToViewport();
      }, 0);
    }
  };

  if (!apiKey) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">API ключ для Яндекс Карт не найден.</p>
      </div>
    );
  }

  return (
    <YMaps
      query={{
        apikey: apiKey,
        load: 'Map,control.TypeSelector,control.ZoomControl,control.FullscreenControl,editor',
      }}
    >
      <YandexMap
        defaultState={{
          center: [55.886777, 52.312182],
          zoom: 15,
          controls: [],
        }}
        width="100%"
        height="100%"
        instanceRef={mapRef}
        // ИЗМЕНЕНО: Функция стала асинхронной (async)
        onLoad={async (ymapsInstance) => {
          if (mapRef.current) {
            const map = mapRef.current;
            
            map.controls.add('typeSelector', { float: 'right' });
            map.controls.add('zoomControl', { position: { right: 10, top: 100 } });
            const fullscreenControl = new ymapsInstance.control.FullscreenControl();
            map.controls.add(fullscreenControl);
            fullscreenControl.events.add('fullscreenexit', handleFullscreenExit);

            // ДОБАВЛЕНО: Явно дожидаемся, пока модуль 'editor' будет готов
            await ymapsInstance.modules.require(['editor']);

            // Теперь, когда мы уверены, что редактор готов, подписываемся на события
            eventBus.on('mode-change', (newMode) => {
              if (newMode === 'draw_polygon') {
                map.editor.startDrawing('polygon');
              } else {
                map.editor.stop();
              }
            });
          }
        }}
      />
    </YMaps>
  );
}