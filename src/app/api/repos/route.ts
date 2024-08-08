import { NextRequest, NextResponse } from "next/server";

// Определение асинхронного обработчика GET-запроса
export const GET = async (req: NextRequest): Promise<NextResponse> => {
  // Извлечение параметров запроса из URL
  const searchParams = req.nextUrl.searchParams;

  // Выполнение запроса к GitHub API с использованием параметров из запроса
  const response = await fetch(
    `${process.env.GITHUB_API_URL}?q=${searchParams.get("query") || ""}&page=${
      searchParams.get("page") || 1
    }&per_page=${searchParams.get("per_page") || 10}`,
    {
      method: "GET",
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`, // Использование токена для аутентификации
      },
    },
  );

  // Преобразование ответа от GitHub API в формат JSON
  const rawData = await response.json();

  // Асинхронное получение списка языков для каждого репозитория
  const languages = await Promise.all(
    rawData.items.map(async (item: any): Promise<string[]> => {
      const response = await fetch(item.languages_url, {
        method: "GET",
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`, // Использование токена для аутентификации
        },
      });
      const data = await response.json();
      return Object.keys(data); // Возвращение списка языков
    }),
  );

  // Формирование объекта данных, который будет возвращен в ответе
  const data = {
    total_count: rawData.total_count, // Общее количество найденных репозиториев
    items: rawData.items.map((item: any, index: number) => ({
      id: item.id, // ID репозитория
      name: item.name, // Название репозитория
      owner: {
        id: item.owner.id, // ID владельца репозитория
        login: item.owner.login, // Логин владельца
        avatar_url: item.owner.avatar_url, // URL аватара владельца
        url: item.owner.html_url, // URL профиля владельца
      },
      url: item.html_url, // URL репозитория
      description: item.description, // Описание репозитория
      updatedAt: item.updated_at, // Дата последнего обновления
      forksCount: item.forks_count, // Количество форков
      stargazersCount: item.stargazers_count, // Количество звезд
      languages: languages[index], // Список языков, используемых в репозитории
      license: item.license, // Лицензия репозитория (если есть)
    })),
  };

  // Возвращение ответа с JSON данными
  return NextResponse.json(data || {});
};
