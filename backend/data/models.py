from sqlalchemy import Column, Integer, String, Table, ForeignKey
from sqlalchemy.orm import relationship
from backend.database import Base

# ✅ Fix: Rename column for consistency and prevent typos
tags_association = Table(
    'tags_association', Base.metadata,
    Column('owned_music_lossless_id', Integer, ForeignKey('owned_music_lossless.id'), primary_key=True),
    Column('tag_id', Integer, ForeignKey('tags.id'), primary_key=True)
)

class Tag(Base):
    __tablename__ = 'tags'
    __table_args__ = {'extend_existing': True}

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    
    # ✅ Reverse relationship to OwnedMusicLossless
    owned_music = relationship("OwnedMusicLossless", secondary=tags_association, back_populates="tags")

    def __repr__(self):
        return f"<Tag(name='{self.name}')>"

class OwnedMusicLossless(Base):
    __tablename__ = 'owned_music_lossless'
    __table_args__ = {'extend_existing': True}
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    artist = Column(String, index=True)
    track_id = Column(String, unique=True, index=True)
    
    # ✅ Many-to-many relationship with Tag
    tags = relationship("Tag", secondary=tags_association, back_populates="owned_music")

    def __repr__(self):
        return f"<OwnedMusicLossless(artist='{self.artist}', track_id='{self.track_id}', tags={[tag.name for tag in self.tags]})>"

class OwnedMusicCompressed(Base):
    __tablename__ = 'owned_music_compressed'
    __table_args__ = {'extend_existing': True}
    
    id = Column(Integer, primary_key=True, index=True)
    artist = Column(String, index=True)
    track_id = Column(String, unique=True, index=True)

    def __repr__(self):
        return f"<OwnedMusicCompressed(artist='{self.artist}', track_id='{self.track_id}')>"

class UnownedMusic(Base):
    __tablename__ = 'unowned_music'
    __table_args__ = {'extend_existing': True}
    
    id = Column(Integer, primary_key=True, index=True)
    artist = Column(String, index=True)
    track_id = Column(String, unique=True, index=True)
    playlist = Column(String)
    url = Column(String)

    def __repr__(self):
        return f"<UnownedMusic(artist='{self.artist}', track_id='{self.track_id}', playlist='{self.playlist}', url='{self.url}')>"
