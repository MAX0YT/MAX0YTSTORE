const fs = require('fs').promises;
const path = require('path');
const htmlMinifier = require('html-minifier-terser'); // Убедитесь, что пакет установлен

async function minifyHtmlDirectory(inputDir, outputDir) {
    try {
        await fs.mkdir(outputDir, { recursive: true });
        console.log(`✅ Директория ${outputDir} создана или уже существует`);

        // Читаем содержимое входной директории
        const items = await fs.readdir(inputDir, { withFileTypes: true });

        for (const item of items) {
            const inputPath = path.join(inputDir, item.name);
            const outputPath = path.join(outputDir, item.name);

            if (item.isFile() && path.extname(item.name).toLowerCase() === '.html') {
                try {
                    // Читаем исходный HTML-файл
                    const htmlContent = await fs.readFile(inputPath, 'utf8');
                    
                    // Минифицируем содержимое
                    const minifiedHtml = await htmlMinifier.minify(htmlContent, {
                        removeComments: true,         // Удаление комментариев
                        collapseWhitespace: true,     // Удаление лишних пробелов
                        conservativeCollapse: false,
                        removeAttributeQuotes: false, // Сохранение кавычек для стабильности
                        keepClosingSlash: true,       // Сохранение слэша в тегах
                        minifyCSS: true,              // Минификация встроенного CSS
                        minifyJS: true,               // Минификация встроенного JS
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true,
                        caseSensitive: true
                    });

                    // Записываем минифицированный файл
                    await fs.writeFile(outputPath, minifiedHtml, 'utf8');
                    console.log(`✅ Файл минифицирован: ${item.name}`);

                } catch (error) {
                    console.error(`❌ Ошибка при обработке файла ${item.name}:`, error.message);
                }
            }
        }

        console.log('🎉 Минификация всех HTML-файлов завершена!');

    } catch (error) {
        console.error('❌ Критическая ошибка:', error.message);
    }
}

// Запуск программы
const inputDirectory = './nonminified-HTML';      // Исходная директория с HTML-файлами
const outputDirectory = './minifiedHTML';    // Директория для минифицированных файлов

minifyHtmlDirectory(inputDirectory, outputDirectory);