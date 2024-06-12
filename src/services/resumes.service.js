


export class ResumesService {

  constructor(resumesRepository) {
    // 생성자에서 전달받은 PostsRepository 의존성을 주입합니다.
    this.resumesRepository = resumesRepository;
  }
 


  createResume = async ( user, title, introduce) => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const createResume = await this.resumesRepository.createResume(user, title, introduce);
      return{
        resumeId: createResume.resumeId,
        authorId: createResume.authorId,
        title: createResume.title,
        status: createResume.status,
        introduce: createResume.introduce,
        createdAt: createResume.createdAt,
        updatedAt: createResume.updatedAt,
      }
    }
  



    findAllResumes = async () => {
      // 저장소(Repository)에게 데이터를 요청합니다.
      const resumes = await this.resumesRepository.findAllResumes();
    
      // 호출한 Resume들을 가장 최신 이력서부터 정렬합니다.
      resumes.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });
    
      // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
      return resumes.map((resume) => {
        return {
          resumeId: resume.resumeId,
          authorId: resume.authorId,
          title: resume.title,
          status: resume.status,
          introduce: resume.introduce,
          createdAt: resume.createdAt,
          updatedAt: resume.updatedAt,
        };
      });
    };
    

  findPostById = async (resumeId) => {
    // 저장소(Repository)에게 특정 게시글 하나를 요청합니다.
    const resumes = await this.resumesRepository.findPostById(resumeId);

    return {
      resumeId: resumes.resumeId,
      authorId: resumes.authorId,
      title: resumes.title,
      status: resumes.status,
      introduce: resumes.introduce,
      createdAt: resumes.createdAt,
      updatedAt: resumes.updatedAt,
    };
  };



  updateResume = async (resumeId, title, introduce) => {
    // 저장소(Repository)에게 특정 게시글 하나를 요청합니다.
    const resumes = await this.resumesRepository.findResumeById(resumeId);
    if (!resumes) throw new Error('존재하지 않는 게시글입니다.');

    // 저장소(Repository)에게 데이터 수정을 요청합니다.
    await this.resumesRepository.findResumeById(resumeId, title, introduce);

    // 변경된 데이터를 조회합니다.
    const resume = await this.resumesRepository.findResumeById(resumeId);

    return {
      resumeId: resume.resumeId,
      authorId: resume.authorId,
      title: resume.title,
      status: resume.status,
      introduce: resume.introduce,
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt,
    };
  };

  deleteResume = async (resumeId) => {
    // 저장소(Repository)에게 특정 게시글 하나를 요청합니다.
    const resumes = await this.resumesRepository.findResumeById(resumeId);
    if (!resumes) throw new Error('존재하지 않는 게시글입니다.');

    await this.resumesRepository.deleteResume(resumeId);

    return {
      resumeId: resumes.resumeId,
    };
  };
}