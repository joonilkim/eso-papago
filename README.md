```sh
EsoExtractData.exe -l en.lang -o en.lang -p -t # en.lang.txt en.lang.txt.id
EsoExtractData.exe -l kr.lang -o kr.lang -p -t # kr.lang.txt kr.lang.txt.id

yarn translate /tmp /tmp/new.txt

cp kr.lang kr.lang.bak
EsoExtractData.exe -x /tmp/new.txt -i en.lang.id.txt -t -p -o kr.lang
```
