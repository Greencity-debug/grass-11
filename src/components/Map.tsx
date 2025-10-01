// src/components/Map.tsx
'use client';

import { useRef } from 'react';
import { YMaps, Map as YandexMap } from '@pbe/react-yandex-maps';

export default function Map() {
  const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY;
  const mapRef = useRef<any>(null);

  if (!apiKey) {
    return <p>API ключ не найден.</p>;
  }

  const handleFullscreenExit = () => {
    if (mapRef.current) {
      setTimeout(() => {
        mapRef.current.container.fitToViewport();
      }, 0);
    }
  };

  return (
    <YMaps
      query={{
        apikey: apiKey,
        load: 'Map,control.TypeSelector,control.ZoomControl,control.FullscreenControl',
      }}
    >
      <YandexMap
        defaultState={{
          center: [55.886777, 52.312182],
          zoom: 15,
          // ИЗМЕНЕНО: Очищаем массив, так как добавляем все контролы вручную
          controls: [], 
        }}
        width="100%"
        height="100%"
        instanceRef={mapRef}
        // ИЗМЕНЕНО: Вся логика по добавлению и настройке контролов теперь здесь
        onLoad={(ymapsInstance) => {
          if (mapRef.current) {
            const map = mapRef.current;

            // Добавляем переключатель типа карты справа
            map.controls.add('typeSelector', { position: { top: 10, right: 10 } });

            // Добавляем контрол масштаба справа
            map.controls.add('zoomControl', { position: { right: 10, top: 100 } });
            
            // Добавляем кнопку полного экрана (в её стандартном месте) и подписываемся на событие
            const fullscreenControl = new ymapsInstance.control.FullscreenControl();
            map.controls.add(fullscreenControl);
            fullscreenControl.events.add('fullscreenexit', handleFullscreenExit);
          }
        }}
      />
    </YMaps>
  );
}