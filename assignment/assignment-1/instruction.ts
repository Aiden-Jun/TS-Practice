// 아래의 Lecture를 학습하고 과제를 진행하세요
// git을 설치하세요(설치되어 있다면 건너뛰세요)
// Node.js를 설치하세요(설치되어 있다면 건너뛰세요)
// Visual Studio Code 또는 WebStorm 에디터를 설치하세요(설치되어 있다면 건너뛰세요)
// 에디터로 OOP 프로젝트를 열어주세요
// 이 시점부터 모든 명령어는 터미널에서 실행할 수 있어요
// 깃허브의 master 브랜치를 pull 하세요
// npm install 명령어를 실행하세요
// 과제를 진행하기 위해 feat/assignment-1 브랜치를 생성해주세요
// 파이썬에서 만들었던 store 프로젝트를 타입스크립트로 구현하세요
// 모르는 부분은 건너뛰고 수업 시간에 질문하세요
// 과제가 끝나면 커밋을 생성하고 master 브랜치로 이동해서 master 브랜치를 pull 하세요
// feat/assignment-1 브랜치로 이동한 후 master 브랜치를 merge 하세요
// 완성된 feat/assignment-1 브랜치를 깃허브에 push 하세요
// 깃허브에서 pull request 작업을 squash merge 모드로 실행하세요
// 깃허브의 feat/assignment-1 브랜치와 로컬의 feat/assignment-1 브랜치를 모두 삭제하세요
// 깃허브의 master 브랜치를 pull 하세요

////////////////////////////////////////////////////////////////////////////////////////////////////

// Lecture 1. 깃 명령어
// git init: 임의의 폴더를 깃으로 관리하기 시작합니다
// git add . : 현재 폴더의 모든 파일을 깃으로 추적하기 시작합니다
// git commit -m "메세지": 깃으로 추적하고 있는 모든 파일의 현재 상태를 저장하는 커밋을 생성합니다
// git remote add origin 깃허브 주소: 현재 리포지토리가 사용할 깃허브 주소의 별명을 origin으로 등록합니다
// git push origin 브랜치: 깃허브 리포지토리에 현재 브랜치를 업로드 합니다
// git clone 깃허브 주소: 깃허브 리포지토리를 최초로 로컬에 복사합니다
// git pull origin 브랜치: 깃허브 리포지토리에서 브랜치의 최신 버전을 로드합니다
// git branch 브랜치: 브랜치를 생성합니다
// git checkout 브랜치: 브랜치의 가장 최신 커밋으로 이동합니다
// git checkout 커밋 아이디: 해당 커밋으로 이동합니다
// git reset --hard head~n: 현재 존재하는 위치(HEAD)로부터 n개의 커밋을 삭제하고 그 이전으로 이동합니다
// git merge 타겟 브랜치: 현재 브랜치에 타겟 브랜치를 병합합니다
// git branch -D 브랜치: 브랜치를 삭제합니다

////////////////////////////////////////////////////////////////////////////////////////////////////

// Lecture 2. Object Oriented Programming(OOP)
// 프로그래밍: 데이터의 변화를 다루는 일
// 문제점: 데이터의 관계가 너무 복잡해지면 변화의 흐름을 파악하기 어렵다
// 해결책: 객체 지향 프로그래밍
// 객체지향 프로그래밍의 4대 원칙
// 1. 추상화: 객체 사용자는 클래스 내부 로직을 몰라도 객체를 편리하게 사용할 수 있도록 클래스를 잘 설계해야 한다
// 2. 캡슐화: 속성을 감추고 메소드로만 속성을 변경한다
// 3. 상속: 공통된 속성과 메소드는 중복을 피하기 위해 부모 클래스를 활용한다
// 4. 다형성: 확장성을 위해 이름은 같지만 내부 로직은 다르게 구현한다

////////////////////////////////////////////////////////////////////////////////////////////////////

// Lecture 3. Architecture
// 회사를 운영하는 것과 비슷한 전략으로 소프트웨어를 설계합니다
// 규모가 작은 회사라면 사업자 개인이 모든 일을 처리합니다
// 규모가 큰 회사라면 전문성을 가지는 직원 여러명을 고용하고 일을 위임합니다
// 규모가 더 큰 회사라면 전문성을 가지는 직원들로 모이는 부서를 만들고 실행 및 보고 체계를 만듭니다
// 이를 소프트웨어 설계에 비유하면 다음과 같습니다
// 규모가 작은 소프트웨어라면 하나의 메인 파일(index.ts)에서 모든 일을 처리합니다
// 규모가 큰 소프트웨어라면 클래스를 설계하고 전문성을 가지는 객체 여러개를 생성해서 일을 위임합니다
// 규모가 더 큰 소프트웨어라면 전문성을 가지는 객체들로 레이어를 만들고(UI, Service, Domain, Database) 레이어끼리의 실행 및 소통 체계를 만듭니다
// 우리가 이번 프로젝트에서 설계하는 각 레이어의 역할은 다음과 같아요

// UI
// : 유저로부터 데이터를 입력받고, 요청에 대한 응답 데이터를 유저에게 보여줘요
// : json 객체를 사용해서 서비스의 데이터 상태를 표현해요

// Service
// : 요청을 처리하기 위해서 데이터를 활용한 다양한 역할(서비스 로직)을 수행해요
// : Repository에게 도메인 객체를 받아서 서비스 로직을 실행하고, json 객체를 만들어서 UI 레이어에 전달해요

// Repository
// : Service에서 필요한 데이터를 Database에서 가져와서 전달해요
// : Database로 읽은 파일 데이터를 도메인 객체로 변환해요

// Domain
// : Service에서 요구하는 다양한 데이터의 복잡한 상호 작용(비즈니스 로직)을 담당해요
// : 서비스에서 필요한 비즈니스 로직을 담당해요

// Database
// : Service에서 사용하는 다양한 데이터를 파일에 쓰고, 읽고, 검색하고, 삭제해요
// : 서비스에서 사용하는 다양한 데이터를 파일에 쓰고, 읽고, 검색하고, 삭제해요

// OOP의 핵심은 한 객체가 자신만의 데이터와 그 데이터에 대한 책임을 가지도록 설계해서 다양한 데이터끼리의 상호작용에 대한 어려움울 해결하는 것에 있어요
// 각각의 레이어도 이와 같아요. 그리고 이렇게 객체의 집합인 하나의 레이어가 자신만의 책임을 가지도록 하는 것을 아키텍쳐 설계라고 불러요
// 좋은 개발자는 객체, 레이어를 설계할 때, 이 객체와 레이어를 사용하는 다른 객체와 다른 레이어에게 최상의 사용 경험을 제공한다는 관점에서 코드를 작성해요

////////////////////////////////////////////////////////////////////////////////////////////////////

// Lecture 4. Dependency
// 개발자는 함수, 객체, 레이어의 상호작용으로 인한 데이터의 변화를 다루는 일을 합니다
// 함수, 객체, 레이어는 각각 자신이 책임지고 관리하는 데이터들을 가지고 있는 주체입니다
// 이들이 서로 상호작용할 때 너무 강한 결합도를 가지고 있으면 개발 속도, 의존성, 확장성과 같은 문제점들이 생겨납니다
// 이러한 문제를 해결하기 위해서는 의존하고 있는 주체들끼리의 결합도를 낮춰야 하며, 이를 위해 명세서를 활용합니다
// 명세서의 대표적인 예시로 타입과 인터페이스가 있으며, 이외에도 다양한 형태로 이를 활용할 수 있습니다