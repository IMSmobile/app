import { Camera } from '@ionic-native/camera';

export class MockCamera extends Camera {
  getPicture(options) {
    const mockImage: string =
      'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAESElEQVR42q2WC0ybVRTH/7d0hUILpYwC' +
      '8qzdCrSD0TFWYQmTkYExihDDw7BgJpi4+KAz0WzAZnTLFk2WgZI0YQaX6ZRuuiFuSyZKOnAW0AFTCsJw' +
      'vB9rhcqQ1yi9fv1UspQV1+lJbr6bc+85v3vPOffej+ABJYvDVS/brAZHPZdwWs5TW6IzO/KvjkE0NtBc' +
      'qcBfULgxZROjoqxd6l/f0a8sM1W93xqdQdYEZDLOt0vkBTJhgMrdjY8gr3C7fypOsBBRmpB6SDaTm3oO' +
      'Sg+9RusAjkuALMIplgojNBkhseEKUTBG55fQP7uAi5ZuiBOm4CMVwkMSB7NZgMuVlegH9s0COsZ0Yk3A' +
      'TkAg5vCUIp53c1JgElS+gdRinSOt01Ps+P6hy/RvO3qP/T/9IqZduheyCrALUPMBw57I59kxygizalJt' +
      '/gEOzu4HsIuGaRVOAZke7mrbwqJB196AHQUvo/Xnbla/LVCCqzmZ4L9fxX7P9f7K6ksT41uCtKcerIqe' +
      'AXKl0RvLCg9olD+2f0qC5WmoqtVT3BoiB9JToMhIBz8tm16tOErO6a+xq34zJ3VGV3fcaLVZmW24FZXo' +
      'xoxrAYo3SMPKj+wvpuUN75G8gsM4fuYKbarXk93JSXj14Ov44JPPafYTKaR3YJgBEBIfFYaebgMLM97Q' +
      '15hNg9qSs6bG+wIyGIC3UHBisyoGMTJgS85LeOfjOjRdv4HdT6fjlfxnUXnmC2TLZQjw8lwVjpqmkxif' +
      'Gt7HACqc7SD3NlDWDCiZOBMlE5KP6pkQ8flkT0E2jH0D9rxQbWoyUfiJVyW5fbmzc87tzhEGoHOaZAFT' +
      'RX8wVWTv25NpTy6UkWjle7BJX0se8eEljk3fbXGaAwehe1N9EbaeR1WeMvK4d4y9ZFn9jrO1pHXC5LgD' +
      '105yMIeoH/PhfrjFL1oZFiEi1kDTCrhrcop8fzuG9lokuhlzc/ndeRNsy7MtLgGywDmh8I3OlXpLA0MD' +
      '+GQueAEXQsR2/zQkUkKmyKO0p8ujY8BgOt3ftr/cmR+nAKaibMmxKvgKvSHmcbG4XgKtIhmZWxUIjfKH' +
      'yW0JE12/Y/qaZfBKw83yX1reqHAJkO+3jiZkboVPgA8bawv1gn45Crq3yyhhpH5yhDLHgPiPcZDzwmd0' +
      '6KcS13JwLDeA5h28gECZinU43teGmsNZ0Jwa+H8AR3MktucO1doBaP+6Gl+er4YhvHBlfEN8CELk/jD3' +
      '3cGl0uv4TztgAMQOaI4oYm/XyY55IorwpO78dcTSM99pGZoqGmh7y7Uqejc/tFi+7SkNXyAKNw0aya0+' +
      'I8a9N+Fi+wyN8+IS85KNjs4KGslitHbEeEznzM+aT+aTcQKDTMJTB4m4K9PHPIIw3jcCL5EAv82Rxvrv' +
      'hrVLVuvDARgxbJd7qmND3Vfm5b24i+4t+4bsTApjq6vydAdzdeGh/yrsd5LaYZ7ji7Ym4E/PurkoKD1C' +
      '1gAAAABJRU5ErkJggg==';

    return new Promise((resolve, reject) => {
      resolve(mockImage);
    });
  }
}
