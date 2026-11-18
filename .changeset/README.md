# Changesets

Folder ini dipakai [changesets](https://github.com/changesets/changesets) untuk mencatat perubahan
paket dan menghasilkan CHANGELOG serta versi rilis.

## Menambah perubahan

```bash
pnpm changeset
```

Pilih paket (`@nemo/ui`), pilih jenis perubahan (`patch` / `minor` / `major`), lalu tulis ringkasan
yang nanti muncul di CHANGELOG. Commit file `.changeset/*.md` yang terbentuk bersama perubahan kode.

## Merilis

```bash
pnpm version-packages   # menaikkan versi + menulis CHANGELOG
pnpm build
pnpm release            # changeset publish (menjalankan prepublishOnly: build + test)
```

Playground bersifat privat sehingga tidak ikut dirilis.
