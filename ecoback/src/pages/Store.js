import '../css/Store.css';
const Store = () => {
    return(
      <div>
      <div className="normal" id="normalline" style={{ padding: '5px 7px' }}>
        <div className="title">Eco$Back</div>
        <div id="menubar_array"> 
          <line/><line/><line/>
        </div>
      </div>
      <hr/>
      <div class="top_line">
        <img
          src={require('../image/arrow-right.png')} // Modify image path
          alt="receipt"
          style={{ width: '30px', height: '30px' }}
        />
        <div class="normal" style={{fontSize: '20px',margin:'auto 0'}}>포인트 상점</div>
      </div>
        <div id="boxline">
          <div className="box_categories">
            <img
              src={require('../image/tumbler.png')} // Modify image path
              alt="receipt"
              style={{ width: '100px', height: '90px' }}
            />
          </div>
          <div className="box_categories">
            <div id="muglie">
            <img
              src={require('../image/ice_mug.png')} // Modify image path
              alt="receipt"
              style={{ width: '38px', height: '70px' ,margin:'0'}}
            />
            <img
              src={require('../image/hot_mug.png')} // Modify image path
              alt="receipt"
              style={{ width: '43px', height: '40px' ,margin:'0'}}
            /></div>
          </div>
          <div className="box_categories">
            <img
              src={require('../image/convenience_store.png')} // Modify image path
              alt="receipt"
              style={{ width: '100px', height: '90px' }}
            />
          </div>
        </div>
        <div id="title_line">
          <div class="normal">텀블러</div>
          <div class="normal">카페</div>
          <div class="normal">편의점</div>
        </div>
        <div id="boxline">
          <div className="box_categories">
            <img
              src={require('../image/chicken.png')} // Modify image path
              alt="receipt"
              style={{ width: '100px', height: '60px' }}
            />
          </div>
          <div className="box_categories">
            <img
              src={require('../image/ice_cream.png')} // Modify image path
              alt="receipt"
              style={{ width: '80px', height: '85px' }}
            />
          </div>
          <div className="box_categories">
            <img
              src={require('../image/bakery.png')} // Modify image path
              alt="receipt"
              style={{ width: '90px', height: '50px' }}
            />
          </div>
        </div>
        <div id="title_line">
          <div class="normal">치킨/피자</div>
          <div class="normal">아이스크림/빙수</div>
          <div class="normal">베이커리/도넛</div>
        </div>
        <div id="boxline">
          <div className="box_categories">
            <img
              src={require('../image/gift_card.png')} // Modify image path
              alt="receipt"
              style={{ width: '105px', height: '50px' }}
            />
          </div>
          <div className="box_categories">
            <img
              src={require('../image/beauty.png')} // Modify image path
              alt="receipt"
              style={{ width: '90px', height: '60px' }}
            />
          </div>
          <div className="box_categories">
            <img
              src={require('../image/movie.png')} // Modify image path
              alt="receipt"
              style={{ width: '90px', height: '50px' }}
            />
          </div>
        </div>
        <div id="title_line">
          <div class="normal">상품권/마트</div>
          <div class="normal">뷰티/패션/건강</div>
          <div class="normal">영화/OTT/게임</div>
        </div>

        <div class="normal" style={{textAlign:'center', margin:'10vh 0'}}>포인트가 2024년 3월 1일에 소멸될 예정이에요.</div>
        
      </div>
    );
  };
  
  export default Store;