import Link from "next/link";

export const showCategories = b => {
  return b.categories.map((c, i) => (
    <Link key={i} href={`/categories/${c.slug}`}>
      <a className="btn btn-sm btn-primary mr-1 mb-1">{c.name}</a>
    </Link>
  ))
}
export const showTags = b => {
  return b.tags.map((t, i) => (
    <Link key={i} href={`/tags/${t.slug}`}>
      <a className="btn btn-sm btn-outline-primary mr-1 mb-1">{t.name}</a>
    </Link>
  ))
}
