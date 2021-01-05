import Link from "next/link"
import timeAgo from "../../../actions/timeAgo"
import {IMG} from '../../../config'
import style from '../../../styles/card.module.css'
import Image from 'next/image'

const SmallCard = ({b}) => {
  return (
    <div className="card mb-3 mt-3">
      <Link href={`/blog/${b.slug}`}>
        <div className={style.link}>

          <Image
            className="card-img-top"
            width={480}
            height={100}
            src={`${IMG}/${b.avatar}`}
            alt={b.title}
          />

          <div className="card-body">
            <div className="card-title line-clamp line-clamp-2"><b>{b.title}</b></div>
            <div className="card-text" dangerouslySetInnerHTML={{__html: b.excerpt}}/>
          </div>
        </div>
      </Link>
      <Link href={`/public/${b.postedBy.username}`}>
        <div className={style.footerLink}>
          <div className="card-footer clearfix">
            <span className="small float-left">{timeAgo(b.createdAt)}</span><span
            className="small float-right">{b.postedBy.username}</span>
          </div>
        </div>
      </Link>

      <style jsx>{`
        .card-body {
          height: 220px;
          font-size: .9rem;
        }
        .line-clamp {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;  
        }
        .line-clamp-2 {
          -webkit-line-clamp: 2;
        }
      `}</style>
    </div>
  )

}

export default SmallCard
