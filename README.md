## Quick start

### Start Front-end "system-fe"

```bash
npm run serve
```

### Start APIs "system-BE"

```bash
docker-compose up -d
```

```bash
npm run start:dev
```

### Start processing of images "awesomeImages"

```bash
go run main.go
```

### Runt unit tests

```bash
npm run test:unit -- --coverage
```

- **Search product on all parsers:**
  http://localhost:3000/search?search=iphone

- **Get all categories:**
  http://localhost:5000/categories

- **Get items on the page:**
  http://localhost:5000/page?link=/ru/photo-video/obektivy/

