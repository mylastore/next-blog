import Link from "next/link"
import {IMG} from '../../../config'
import style from '../../../styles/card.module.css'
import {showTags, showCategories} from "./CatsAndTags"
import Image from 'next/image'
import timeAgo from "../../../helpers/timeAgo"

const Card = ({b}) => {
  return (
    <section>
      <header>
        <Link href={`/blog/${b.slug}`}>
          <a className={style.noLink}><h4 className={style.headingColor}><strong>{b.title}</strong></h4></a>
        </Link>
        <div className="mb-3">
          <Link href={`/blog/${b.slug}`}>
            <a>
              <Image
                className="img img-fluid mb-3"
                width={700}
                height={150}
                src={`${IMG}/${b.avatar}`}
                alt={b.title}
              />
            </a>
          </Link>
        </div>
      </header>
      <div className="row">
        <div className="col-md-12">
          <div className='pb-3'>
            <Link href={`/public/${b.postedBy.username}`}>
              <a className="noLink"><p className="mark small">Written
                by {b.postedBy.username} | {timeAgo(b.updatedAt)}</p></a>
            </Link>
            <div dangerouslySetInnerHTML={{__html: b.excerpt}}/>
          </div>
          <div className="mb-3">
            {showCategories(b)}
            {showTags(b)}
          </div>
          <Link href={`/blog/${b.slug}`}>
            <a className='btn btn-sm btn-outline-success float-right'>READ MORE</a>
          </Link>
        </div>
      </div>
      <hr/>
    </section>
  )
}

export default Card