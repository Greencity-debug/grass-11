// src/components/Map.tsx
'use client';

import { YMaps, Map as YandexMap } from '@pbe/react-yandex-maps';

export default function Map() {
  const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY;

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
        // ИЗМЕНЕНО: Явно указываем, какие модули нужно загрузить. Ничего лишнего.
        load: 'Map,control.TypeSelector,control.ZoomControl,control.FullscreenControl',
      }}
    >
      <YandexMap
        defaultState={{
          center: [55.886777, 52.312182],
          zoom: 15,
          controls: ['typeSelector', 'zoomControl', 'fullscreenControl'],
        }}
        width="100%"
        height="100%"
      />
    </YMaps>
  );
}