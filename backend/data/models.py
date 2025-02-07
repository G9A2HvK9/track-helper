from sqlalchemy import Column, Integer, String, Table, ForeignKey
from sqlalchemy.orm import relationship
from backend.database import Base

# ✅ Fix: Prevent Duplicate Table Definition by using `extend_existing=True`
tags_association = Table(
    'tags_association', Base.metadata,
    Column('owned_music_losless_id', Integer, ForeignKey('owned_music_losless.id')),
    Column('tag_id', Integer, ForeignKey('tags.id')),
    extend_existing=True  
)

class Tag(Base):
    __tablename__ = 'tags'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)

    def __repr__(self):
        return f"<Tag(name={self.name})>"

class OwnedMusicLosless(Base):
    __tablename__ = 'owned_music_losless'
    
    id = Column(Integer, primary_key=True, index=True)
    artist = Column(String, index=True)
    track_id = Column(String, unique=True, index=True)
    
    # ✅ Many-to-many relationship with Tag
    tags = relationship("Tag", secondary=tags_association, backref="owned_music_losless")

    def __repr__(self):
        return f"<OwnedMusic(artist={self.artist}, track_id={self.track_id}, tags={self.tags})>"

class OwnedMusicCompressed(Base):
    __tablename__ = 'owned_music_compressed'
    
    id = Column(Integer, primary_key=True, index=True)
    artist = Column(String, index=True)
    track_id = Column(String, unique=True, index=True)

    def __repr__(self):
        return f"<OwnedMusic(artist={self.artist}, track_id={self.track_id})>"

class UnownedMusic(Base):
    __tablename__ = 'unowned_music'
    
    id = Column(Integer, primary_key=True, index=True)
    artist = Column(String, index=True)
    track_id = Column(String, unique=True, index=True)
    playlist = Column(String)
    url = Column(String)

    def __repr__(self):
        return f"<UnownedMusic(artist={self.artist}, track_id={self.track_id}, playlist={self.playlist}, url={self.url})>"
