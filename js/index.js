window.onload = function () {


    var bigImgIndex = 0;

    // 路径导航动态渲染
    navPathDataBind();
    function navPathDataBind() {
        // 获取路径导航的页面元素（navPath）
        var navPath = document.querySelector('.content .wrapper .navPath');

        // 获取所需要的数据（data.js-->goodData）
        var path = goodData.path;

        // 遍历数据，根据数据的数量创建DOM元素
        for (var i = 0; i < path.length; i++) {

            // 创建DOM元素最后一条的时候只创建a标签，且该标签没有herf，而不创建i标签

            if (i == path.length - 1) {
                var aNode = document.createElement("a");
                aNode.innerText = path[i].title;
                navPath.appendChild(aNode);
            } else {
                var aNode = document.createElement("a");
                aNode.href = path[i].url;
                aNode.innerText = path[i].title;

                var iNode = document.createElement("i");
                iNode.innerText = '/';

                navPath.appendChild(aNode);
                navPath.appendChild(iNode);
            }

        }
    }

    // 放大镜移入移出和移动
    bigClassBind();
    function bigClassBind() {
        // 获取小图框元素
        var smallPic = document.querySelector('.content .wrapper .center .left .leftTop .smallPic');
        var leftTop = document.querySelector('.content .wrapper .center .left .leftTop');
        var imagessrc = goodData.imagessrc;
        smallPic.onmouseenter = function () {

            // 当鼠标移入小图框时，创建蒙版元素和大图框、大图片元素
            var maskDiv = document.createElement('div');
            maskDiv.className = "mask";
            smallPic.appendChild(maskDiv);


            var bigPic = document.createElement('div');
            bigPic.className = "bigPic";

            var bigImg = document.createElement('img');
            bigImg.src = imagessrc[bigImgIndex].b;
            bigPic.appendChild(bigImg);

            leftTop.appendChild(bigPic);

            // 蒙版移动事件
            smallPic.onmousemove = function (event) {
                var left = event.clientX - smallPic.getBoundingClientRect().left - maskDiv.offsetWidth / 2;
                var top = event.clientY - smallPic.getBoundingClientRect().top - maskDiv.offsetHeight / 2;

                // 设置蒙版活动区域
                if (left < 0) {
                    left = 0;
                } else if (left > smallPic.clientWidth - maskDiv.offsetWidth) {
                    left = smallPic.clientWidth - maskDiv.offsetWidth;
                }

                if (top < 0) {
                    top = 0;
                } else if (top > smallPic.clientHeight - maskDiv.offsetHeight) {
                    top = smallPic.clientHeight - maskDiv.offsetHeight;
                }
                maskDiv.style.left = left + "px";
                maskDiv.style.top = top + "px";

                // 设置蒙版移动时大图片等比例移动效果

                var scale = (smallPic.clientWidth - maskDiv.offsetWidth) / (bigImg.clientWidth - bigPic.offsetWidth);
                bigImg.style.left = -left / scale + "px";
                bigImg.style.top = -top / scale + "px";

            }


            // 当鼠标移出小图框时，删除蒙版元素和大图框元素
            smallPic.onmouseleave = function () {
                smallPic.removeChild(maskDiv);

                leftTop.removeChild(bigPic);
            }
        }
    }

    // 放大镜缩略图动态渲染
    thumbnailData();
    function thumbnailData() {
        //  获取ul事件
        var ul = document.querySelector('.content .wrapper .center .left .leftBottom .picList ul');
        var imagessrc = goodData.imagessrc;

        for (var i = 0; i < imagessrc.length; i++) {
            // 根据数据个数创建li用于存放图片
            var li = document.createElement("li");
            var img = document.createElement("img");
            // 把li追加到ul下
            img.src = imagessrc[i].s;
            li.appendChild(img);
            ul.appendChild(li);
        }
    }

    // 点击缩略图效果
    thumbnailClick();
    function thumbnailClick() {
        // 获取缩略图li
        var liNodes = document.querySelectorAll('.content .wrapper .center .left .leftBottom .picList ul li');
        var imgNodes = document.querySelector('.content .wrapper .center .left .leftTop .smallPic img');
        var imagessrc = goodData.imagessrc;

        // 默认的小图要和缩略图的第一个小图一样
        imgNodes.src = imagessrc[0].s;

        for (let i = 0; i < liNodes.length; i++) {
            liNodes[i].onclick = function () {
                // 获取点击缩略图的下标
                bigImgIndex = i;
                // 根据点击的缩略图改变小图
                imgNodes.src = imagessrc[i].s;
            }
        }
    }

    // 缩略图左右滑动
    thumbnaLeftRightClick();
    function thumbnaLeftRightClick() {
        // 获取左右按钮元素
        var left = document.querySelector('.content .wrapper .center .left .leftBottom a.prev');
        var right = document.querySelector('.content .wrapper .center .left .leftBottom a.next');
        console.log(left, right);
        // 获取div、ul、li元素

        var ulNode = document.querySelector('.content .wrapper .center .left .leftBottom .picList ul');
        var liNodes = document.querySelectorAll('.content .wrapper .center .left .leftBottom .picList li');

        // 计算
        // 起点
        var start = 0;

        // 步长：一次移动两张缩略图
        var step = (liNodes[0].offsetWidth + 20) * 2;

        // 最长可以移动距离
        var endPosition = (liNodes.length - 5) * (liNodes[0].offsetWidth + 20);

        // 往前移动事件
        left.onclick = function () {
            start = start - step;
            if (start < 0) {
                start = 0;
            }
            ulNode.style.left = -start + "px";
        }

        // 往后移动事件
        right.onclick = function () {
            // 每点击一次起点改变一次
            start = start + step;
            if (start > endPosition) {
                start = endPosition;
            }
            ulNode.style.left = -start + "px";
        }
    }

    // 商品详情数据动态渲染
    rightTopData();
    function rightTopData() {
        // 获取rightTop元素
        var rightTop = document.querySelector('.content .wrapper .center .right .rightTop');

        // 查找goodsDetail数据
        var goodsDetail = goodData.goodsDetail;

        // 创建字符串变量用来存放rightTop的内容（用到了模板字符串）
        //模板字符串替换数据：${变量}
        var s = `<h5>${goodsDetail.title}</h5>
                <p>
                    ${goodsDetail.recommend}
                </p>
                <div class="priceWrap">
                    <div class="priceTop">
                        <span>价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</span>
                        <div class="price">
                            <i>￥</i>
                            <span>${goodsDetail.price}</span>
                            <p>降价通知</p>
                        </div>
                        <div class="comment">
                            <p>累计评价</p>
                            <i>670000</i>
                        </div>
                    </div>
                    <div class="priceBottom">
                        <span>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</span>
                        <p>
                            <span>${goodsDetail.promoteSales.type}</span>
                            <span>${goodsDetail.promoteSales.content}</span>
                        </p>
                    </div>
                </div>
                <div class="support">
                    <span>支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</span>
                    <p>${goodsDetail.support}</p>
                </div>
                <div class="address">
                    <span>配&nbsp;送&nbsp;至</span>
                    <p>${goodsDetail.address}</p>
                </div>`

        // 重新渲染rightTop元素
        rightTop.innerHTML = s;
    }

    // 商品参数数据的动态渲染
    rightBottomData();
    function rightBottomData() {
        // 获取rightWrap元素
        var rightWrap = document.querySelector('.content .wrapper .center .right .rightBottom .rightWrap');

        // 查找crumbData数据
        var crumbData = goodData.goodsDetail.crumbData;

        // 遍历crumbData，根据元素个数创建dl，再根据里面的内容创建dt和dd
        for (var i = 0; i < crumbData.length; i++) {
            var dlNodes = document.createElement('dl');
            var dtNodes = document.createElement('dt');

            // 获取dt的内容赋值给dt
            dtNodes.innerText = crumbData[i].title;

            // 把dt添加到dl上
            dlNodes.appendChild(dtNodes);

            // 创建dd并添加到dl上
            for (var j = 0; j < crumbData[i].data.length; j++) {
                var ddNodes = document.createElement('dd');
                ddNodes.innerText = crumbData[i].data[j].type;
                ddNodes.setAttribute('price', crumbData[i].data[j].changePrice);
                dlNodes.appendChild(ddNodes);
            }

            // 把dl添加到rightWrap上
            rightWrap.appendChild(dlNodes);
        }
    }

    // 点击dd颜色变化排他效果和点击dd添加到choose栏的效果
    ddClickBind();
    function ddClickBind() {

        var dlNodes = document.querySelectorAll('.content .wrapper .center .right .rightBottom .rightWrap dl');
        var choose = document.querySelector('.content .wrapper .center .right .rightBottom .rightChoose');

        // 创建新数组用于存放choose一行的结果
        var arr = new Array(dlNodes.length).fill(0);

        for (var k = 0; k < dlNodes.length; k++) {

            // 利用闭包函数实现循环
            (function (k) {

                var ddNodes = dlNodes[k].querySelectorAll('dd');

                for (var i = 0; i < ddNodes.length; i++) {
                    ddNodes[i].onclick = function () {

                        // 清空choose栏避免上一次点击留下的重复显示
                        choose.innerHTML = '';
                        // 实现颜色排他效果
                        for (var j = 0; j < ddNodes.length; j++) {
                            ddNodes[j].style.color = '#666';
                        }
                        this.style.color = 'red';

                        // 实现点击dd在choose框添加div
                        arr[k] = this;
                        changePriceBind(arr);

                        // 遍历arr数组内容添加到choose栏
                        arr.forEach(function(value,index){
                            if(value){
                                var divMark = document.createElement('div');
                                divMark.className = 'mark';

                                divMark.innerText = value.innerText;

                                var aNode = document.createElement('a');
                                aNode.innerText = 'X';
                                aNode.setAttribute('index', index);


                                divMark.appendChild(aNode);
                                choose.appendChild(divMark);
                            }
                        })

                        // 点击X实现删除该a
                        // 获取所有a标签
                        var aNodes = document.querySelectorAll('.content .wrapper .center .right .rightBottom .rightChoose .mark a');
                        
                        // 循环遍历所有a标签的点击事件
                        for(var m = 0; m < aNodes.length; m++){
                            aNodes[m].onclick = function(){
                                // 获取所点击的a属于第几个dl
                                var aNodesIndex = this.getAttribute('index');

                                // 把对应index的dl的数组设置为0
                                arr[aNodesIndex] = 0;
                                changePriceBind(arr);
                                // 获取该index的所有dd，把所有dd恢复成灰色，第一个设为红色
                                var ddList = dlNodes[aNodesIndex].querySelectorAll('dd');

                                for(var n = 0; n < ddList.length; n++){
                                    ddList[n].style.color = '#666';
                                }
                                ddList[0].style.color = 'red';

                                choose.removeChild(this.parentNode);
                            }
                        }

                    }
                }
            })(k)


        }

    }

    // 价格变动的函数声明,当点击选择不同商品属性时才调用
    function changePriceBind(arr){
        //  获取显示价格元素
        var priceNode = document.querySelector('.content .wrapper .center .right .rightTop .priceWrap .priceTop .price > span');
        // 获取原本价格
        var price = goodData.goodsDetail.price;

        // 遍历arr数组，将dd元素身上的价格和原本的价格相加
        for(var i = 0; i < arr.length; i++){
            if(arr[i]){
                var changePrice = Number(arr[i].getAttribute('price'));
                price += changePrice;
            }
        }
        // 把新的价格放到priceNode元素里
        priceNode.innerText = price;

        //以下部分为选择搭配选项卡内容
        var leftPrice = document.querySelector('.content .wrapper .goodsDetail .detailsRight .chooseBox .bottom .left span');
        // 当选择商品不同属性后，保持搭配选项卡左侧的原价跟上方的一样
        leftPrice.innerText = '¥' + price;
        
        // 当选择商品不同属性后，保持搭配选项卡右侧的基础价格为上方的价格
        var ipts = document.querySelectorAll('.content .wrapper .goodsDetail .detailsRight .chooseBox .bottom ul li input');
        
        var oldPrice = Number(leftPrice.innerText.slice(1));
        for(var j = 0; j < ipts.length; j++){
            if(ipts[j].checked){
                oldPrice = oldPrice + Number(ipts[j].value);
            }
        }

        var rightPrice = document.querySelector('.content .wrapper .goodsDetail .detailsRight .chooseBox .bottom .right .price');
        rightPrice.innerText = '¥' + oldPrice;
    }

    // 选择搭配中间区域选择后价格变动效果
    choosePrice();
    function choosePrice(){
        var ipts = document.querySelectorAll('.content .wrapper .goodsDetail .detailsRight .chooseBox .bottom ul li input');
        var leftPrice = document.querySelector('.content .wrapper .goodsDetail .detailsRight .chooseBox .bottom .left span');
        var rightPrice = document.querySelector('.content .wrapper .goodsDetail .detailsRight .chooseBox .bottom .right .price');
        
        for(var i = 0; i < ipts.length; i++){
            ipts[i].onclick = function(){

                var oldPrice = Number(leftPrice.innerText.slice(1));
                // 遍历所有选项框，获取勾选上的价格
                for(var j = 0; j < ipts.length; j++){
                    if(ipts[j].checked){
                        oldPrice = oldPrice + Number(ipts[j].value);
                    }
                }
                rightPrice.innerText = '¥' + oldPrice;
            }
        }
    }

    //公共选项卡函数
    function tab(tabBtns, tabConts){
        for(var i = 0; i < tabBtns.length; i++){
            tabBtns[i].index = i;
            tabBtns[i].onclick = function(){
                for(var j = 0; j < tabBtns.length; j++){
                    tabBtns[j].className = '';
                    tabConts[j].className = '';
                }
                this.className = 'active';
                tabConts[this.index].className = 'active';
            }
        }
    } 

    //点击左边侧边栏切换
    leftTabs();
    function leftTabs(){
        // 获取左边侧边栏选项卡按钮
        var tabBtns = document.querySelectorAll('.content .wrapper .goodsDetail .detailsLeft .detailsLeftTop h4');
        // 获取左边侧边栏下方详细内容
        var tabConts = document.querySelectorAll('.content .wrapper .goodsDetail .detailsLeft .detailsLeftBottom >div');
        tab(tabBtns,tabConts);
    } 

    // 点击右侧详情信息选项卡切换
    rightTabs();
    function rightTabs(){
        // 获取商品介绍选项卡按钮
        var tabBtns = document.querySelectorAll('.content .wrapper .goodsDetail .detailsRight .bottomDetail .tabBtns li');
        // 获取商品介绍下方详细内容
        var tabConts = document.querySelectorAll('.content .wrapper .goodsDetail .detailsRight .bottomDetail .tabContent >div');

        tab(tabBtns,tabConts);
    }

    //  右侧侧边栏点击打开关闭事件
    rightAsideBind();
    function rightAsideBind(){
        var rightNavBtn = document.querySelector('.rightNavBtn');
        var rightNav = document.querySelector('.rightNav');

        var flag = true;//此时为关闭状态

        rightNavBtn.onclick = function(){
            if(flag){
                // 打开
                rightNavBtn.className = 'rightNavBtn btnsOpen';
                rightNav.className = 'rightNav navOpen';
                flag = !flag;
            }else{
                // 关闭
                rightNavBtn.className = 'rightNavBtn btnsClose';
                rightNav.className = 'rightNav navClose';
                flag = !flag;
            }
        }
    }

}