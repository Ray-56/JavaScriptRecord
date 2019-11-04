# showDatePicker&showTimePicker国际化

Flutter 中避免不了使用日期、时间选择器，这里我们使用官方`showDatePicker`与`showTimePicker`。

要想使得这两个组件为中文的先决条件为项目加入国际化（`fluter_localizations`）。

## 添加国际化

在`/pubspec.yaml`中：
```yaml
...
dependencies:
  flutter:
    sdk: fultter
  flutter_localizations: # 添加
    sdk: flutter         # 添加
...
```

`/lib/main.dart`中：
```dart
import 'package:flutter_localizations/flutter_localizations.dart'; // 添加

// MaterialApp中加入
...
localizationsDelegates: [
  GlobalMeterialLocalizations.delegate,
  GlobalWidgetsLocalizations.delegate,
],
supportedLocales: [
    const Locale('zh', 'CH'),
    const Locale('en', 'US'),
],
locale: const locale('zh'),
...
```

## showDatePicker

默认使用`MaterialApp`设置中的。  
`showDatePicker`提供了`locale`参数，如果有需要可以继续更改。

## showTimePicker

默认使用`MaterialApp`设置中的。  
`showTimePicker`没有提供`locale`参数，如果想改变语言可以使用：  

```dart
await showTimePicker(
    context: context,
    initialTime: TimeOfDay.now(),
    builder: (BuildContext context, Widget child) {
        return Localizations(
            locale: const Locale('zh'),
            child: child,
            delegates: <LocalizationsDelegate>[
                GlobalMeterialLocalizations.delegate,
                GlobalWidgetsLocalizations.delegate,
            ]
        )
    }
)
```

## Sell also

[flutter issues](https://github.com/flutter/flutter/issues/12655);