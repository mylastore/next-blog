import Link from "next/link"
import {IMG} from '../../../config'
import style from '../../../styles/card.module.css'
import {showTags, showCategories} from "./CatsAndTags"
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
              <img
                className="img img-fluid mb-3"
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
              <a className="noLink">
                <span className="mark small pull-left">Written
                by {b.postedBy.username} | {timeAgo(b.createdAt)}</span>
                <span className={'mark small float-right'}>Viewed {b.visited} times</span>
              </a>

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